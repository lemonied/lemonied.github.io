import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NProgress } from '@shared/utils';

export const useNProgress = () => {
  const router = useRouter();

  useEffect(() => {
    return () => NProgress.remove();
  }, []);

  useEffect(() => {
    let timer: number;
    const handleStart = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        NProgress.start();
      }, 100);
    };
    const handleDone = () => {
      window.clearTimeout(timer);
      NProgress.done();
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);
    return () => {
      window.clearTimeout(timer);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router]);
};
