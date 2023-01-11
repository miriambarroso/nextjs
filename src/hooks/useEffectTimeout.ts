import { useEffect, useRef } from 'react';

const useEffectTimeout = (effect: () => void, time: number, deps: any[]) => {
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      effect();
      clearTimeout(timeout.current);
    }, time);
    return () => clearTimeout(timeout.current);
  }, [...deps]);
};

export default useEffectTimeout;
