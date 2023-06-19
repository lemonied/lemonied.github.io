import { ComponentType, FC, lazy, LazyExoticComponent, Suspense, useCallback, useState, useTransition } from 'react';
import { Button } from 'antd';
import { sleep, NProgress } from '@shared/utils';

const AsyncLoad = <T extends ComponentType>(factory: () => Promise<{default: T}>) => {
  const C = lazy(() => {
    const load = factory().then(res => sleep(2000).then(() => res));
    NProgress.start();
    load.finally(() => {
      NProgress.done();
    });
    return load;
  }) as LazyExoticComponent<any>;
  return (
    <C />
  );
};

const Router1 = AsyncLoad(() => import('./router-1'));
const Router2 = AsyncLoad(() => import('./router-2'));
const Router3 = AsyncLoad(() => import('./router-3'));

const Routes: FC<{ pathname: string }> = (props) => {
  if (props.pathname === '/page-1') {
    return Router1;
  }
  if (props.pathname === '/page-2') {
    return Router2;
  }
  if (props.pathname === '/page-3') {
    return Router3;
  }
  return <span>切换路由时注意浏览器上方会有进度条显示</span>;
};

const LazyProgress: FC = () => {
  const [pathname, setPathname] = useState('/');

  const [, startTransition] = useTransition();
  const navigate = useCallback((url: string) => {
    startTransition(() => {
      setPathname(url);
    });
  }, []);

  return (
    <div>
      <div>
        <Button onClick={() => navigate('/page-1')} type={pathname === '/page-1' ? 'primary' : 'text'}>页面1</Button>
        <Button onClick={() => navigate('/page-2')} type={pathname === '/page-2' ? 'primary' : 'text'}>页面2</Button>
        <Button onClick={() => navigate('/page-3')} type={pathname === '/page-3' ? 'primary' : 'text'}>页面3</Button>
      </div>
      <hr/>
      <Suspense fallback={<span>loading...</span>}>
        <Routes pathname={pathname} />
      </Suspense>
    </div>
  );

};

export { LazyProgress };
