import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NivelUsuario, useAuthStore } from '@/store/auth';
import { NextPageWithLayout } from '@/pages/_app';
import { classNames } from '@/utils';
import { toastWarning } from '@/utils/toasts';

type Props = {
  pageComponent: NextPageWithLayout;
  children: ReactNode;
};

const RouteGuard = ({ pageComponent, children }: Props) => {
  const authStore = useAuthStore();

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    pageComponent.permissions =
      pageComponent.permissions ?? Object.values(NivelUsuario);

    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageComponent]);

  function authCheck(path: string, notification = false): void {
    if (notification) {
      setAuthorized(true);
      return;
    }

    const auth = authStore.checkAuth();
    let user = null;

    if (auth) {
      user = auth.user;
    }

    if (!pageComponent.permissions.includes(user?.nivel_usuario)) {
      if (!user) {
        setAuthorized(false);
        toastWarning('Você precisa estar logado para acessar essa página!');
        router.push({
          pathname: '/login',
          query: {
            redirect: path,
          },
        });
        return;
      }
      setAuthorized(false);
      toastWarning('Você não tem permissão para acessar essa página!');
      router.push('/403');
      return;
    }

    setAuthorized(true);
    return;
  }

  return (
    <div
      className={classNames(
        authorized ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-300',
      )}
    >
      {children}
    </div>
  );
};

export default RouteGuard;
