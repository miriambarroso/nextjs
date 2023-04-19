import { useEffect, useRef } from 'react';

const useOnMounted = (callback: () => void, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      callback();
    }
  }, deps);
};

export default useOnMounted;
