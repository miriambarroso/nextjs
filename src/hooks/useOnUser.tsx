import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

const useOnUser = (effect, deps) => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      effect();
    }
  }, [user, ...deps]);
};

export default useOnUser;
