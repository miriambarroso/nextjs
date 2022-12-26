import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NivelUsuario, useAuthStore } from '@/store/auth';
import { NextPageWithLayout } from '@/pages/_app';
import RingsLoader from '@/components/loaders/RingsLoader';
import { Transition } from '@headlessui/react';

type Props = {
  pageComponent: NextPageWithLayout;
  children: ReactNode;
};

const PageLoading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RingsLoader className="text-primary animate-appear delay-1000 w-48 h-48" />
    </div>
  );
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <Transition
      appear
      show
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

const RouteGuard = ({ pageComponent, children }: Props) => {
  const authStore = useAuthStore();

  useEffect(() => {}, []);

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

  function authCheck(path: string): void {
    const auth = authStore.checkAuth();
    let user = null;

    if (auth) {
      user = auth.user;
    }

    if (!pageComponent.permissions.includes(user?.nivel_usuario)) {
      if (!user) {
        setAuthorized(false);
        router.push({
          pathname: '/login',
          query: {
            redirect: path,
          },
        });
        return;
      }
      setAuthorized(false);
      router.push('/403');
      return;
    }

    setAuthorized(true);
    return;
  }

  return (
    <div className="transition-all duration-300">
      {!authorized ? (
        <PageLoading />
      ) : (
        <PageTransition>{children}</PageTransition>
      )}
    </div>
  );
};

export default RouteGuard;
