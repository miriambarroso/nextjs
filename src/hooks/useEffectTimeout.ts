import { useEffect, useRef } from 'react';

const useEffectTimeout = (callback: () => void, time: number, deps: any[]) => {
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      callback();
      clearTimeout(timeout.current);
    }, time);
    return () => clearTimeout(timeout.current);
  }, deps);
};

export default useEffectTimeout;
