import { useEffect, useRef } from 'react';

const useOnMounted = (effect: () => void, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      effect();
    }
  }, [...deps]);
};

export default useOnMounted;
