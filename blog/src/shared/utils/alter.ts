export function isPlainObject(obj: any) {
  return !!obj && typeof obj === 'object' && Reflect.getPrototypeOf(obj) === Object.prototype;
}

export function alter<T extends object>(state: T, transform?: (draft: T) => void): T {
  const getter = new Map(); // 原对象->Proxy的Map集合 
  const getted = new Set(); // Proxy对象的集合
  const child2parent = new Map<any, any[]>(); // child->[prop, parent] 子->父的Map集合
  const clone = new Map(); // 原值 -> 克隆值的Map集合
  const cloned = new Set(); // 已克隆元素的集合
  let handler: ProxyHandler<any>;
  function getTarget<C>(original: C): C {
    return clone.get(original) ?? original;
  }
  // 自下向上克隆元素，并重新建立缓存
  function preSetProperty<S extends object>(_target: S, child?: any[]) {
    let target = getTarget(_target);
    if (!cloned.has(target)) {
      let cache: S | null = null;
      if (Array.isArray(target)) {
        cache = target.slice(0) as S;
      } else if (isPlainObject(target)) {
        cache = Object.assign({}, target);
      }
      if (cache) {
        clone.set(target, cache);
        cloned.add(cache);
        const proxied = new Proxy(cache, handler);
        getter.set(cache, proxied);
        getted.add(proxied);
        target = cache;
      }
    }
    if (child) {
      const [key, val] = child;
      (target as any)[key] = val;
      child2parent.set(val, [key, child]);
    }
    const c2p = child2parent.get(_target);
    if (c2p) {
      const [key, parent] = c2p;
      preSetProperty(parent, [key, target]);
    }
    return target;
  }
  // 自上向下遍历元素，并加入缓存
  function proxyFactory(data: any, parent?: any[], addToClone?: boolean) {
    if (!isPlainObject(data) && !Array.isArray(data)) {
      return;
    }
    if (getter.has(data) || getted.has(data)) {
      // eslint-disable-next-line no-console
      console.error('You cannot reassign a proxied object', data);
      throw new Error('Duplicate reference data type');
    }
    const proxied = new Proxy(data, handler);
    getter.set(data, proxied);
    getted.add(proxied);
    if (isPlainObject(data)) {
      Object.keys(data).forEach(key => proxyFactory(data[key], [key, data], addToClone));
    }
    if (Array.isArray(data)) {
      data.forEach((v, k) => proxyFactory(v, [k, data], addToClone));
    }
    if (parent) {
      child2parent.set(data, parent);
    }
    if (addToClone) {
      // 新赋值的元素直接标记成已克隆，后续无需再克隆
      cloned.add(data);
    }
  }
  // 自上向下遍历元素，删除缓存
  function unProxyFactory(value: any) {
    if (isPlainObject(value) || Array.isArray(value)) {
      child2parent.delete(value);
    }
  }
  handler = {
    set(_target: any, prop, value) {
      let target = getTarget(_target);
      if (target[prop] !== value) {
        target = preSetProperty(_target);
        proxyFactory(value, [prop, target], true);
        unProxyFactory(target[prop]);
        target[prop] = value;
      }
      return true;
    },
    get(_target: any, prop) {
      const target = getTarget(_target);
      const value = target[prop];
      if (isPlainObject(value) || Array.isArray(value)) {
        return getter.get(value);
      }
      return value;
    },
    has(_target, prop) {
      const target = getTarget(_target);
      return Reflect.has(target, prop);
    },
    deleteProperty(_target: any, prop) {
      const target = preSetProperty(_target);
      unProxyFactory(target[prop]);
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_target) {
      const target = getTarget(_target);
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_target, prop) {
      const target = getTarget(_target);
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_target, property, attributes) {
      const target = getTarget(_target);
      return Reflect.defineProperty(target, property, attributes);
    },
    getPrototypeOf(_target) {
      const target = getTarget(_target);
      return Reflect.ownKeys(target);
    },
    setPrototypeOf(_target, v) {
      const target = getTarget(_target);
      return Reflect.setPrototypeOf(target, v);
    },
    isExtensible(_target) {
      const target = getTarget(_target);
      return Reflect.isExtensible(target);
    },
    preventExtensions(_target) {
      const target = getTarget(_target);
      return Reflect.preventExtensions(target);
    },
  };
  proxyFactory(state);
  transform?.(getter.get(state));
  return clone.get(state) ?? state;
}
