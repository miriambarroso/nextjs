import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function useScrollToTop() {
  const router = useRouter();
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    [],
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', resetWindowScrollPosition);

    return () => {
      router.events.off('routeChangeComplete', resetWindowScrollPosition);
    };
  }, [router.events, resetWindowScrollPosition]);
}
