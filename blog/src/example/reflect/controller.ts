import 'reflect-metadata';

interface Constructor<T=any> {
  new (...args: any[]): T;
}

const PATH_MATA = 'path';
const METHOD_MATA = 'method';
const INJECTABLE = Symbol('Injectable');
const ROUTE = Symbol('Route');

const Injectable = (): ClassDecorator => target => {
  Reflect.defineMetadata(INJECTABLE, true, target);
};
const isInjectable = <T>(constructor: Constructor<T>) => {
  return !!Reflect.getMetadata(INJECTABLE, constructor);
};
const isRoute = (target: any) => {
  return !!Reflect.getMetadata(ROUTE, target);
};

const Controller = (basePath: string): ClassDecorator => target => {
  Injectable()(target);
  Reflect.defineMetadata(PATH_MATA, basePath, target);
};

const createRoute = (method: string) => (path: string): MethodDecorator => (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  if (type === Function) {
    Reflect.defineMetadata(ROUTE, true, descriptor.value);
    Reflect.defineMetadata(METHOD_MATA, method, descriptor.value);
    Reflect.defineMetadata(PATH_MATA, path, descriptor.value);
  }
};

const Get = createRoute('get');
const Post = createRoute('post');

function mappingRoutes(instance: any) {
  const prototype = Object.getPrototypeOf(instance);
  const methodNames = Object.getOwnPropertyNames(prototype).filter(name => isRoute(prototype[name]));
  const basePath = Reflect.getMetadata(PATH_MATA, instance.constructor);
  return methodNames.map(name => {
    const fn = prototype[name];
    return {
      basePath,
      method: Reflect.getMetadata(METHOD_MATA, fn),
      route: Reflect.getMetadata(PATH_MATA, fn),
      fn,
      name,
    };
  });
}

export function factory<T>(target: Constructor<T>): T {
  if (!isInjectable(target)) {
    throw new Error(`${target.name} must be injectable`);
  }
  const providers = Reflect.getMetadata('design:paramtypes', target) || [];
  const args = providers.map((provider: Constructor) => factory(provider));
  return new target(...args);
}

@Controller('/api')
class TestController {
  @Get('/list')
  getList() {
    return 'this is a list';
  }
  @Post('/create')
  create() {
    return 'create an item';
  }
}

export const test = mappingRoutes(factory(TestController));
