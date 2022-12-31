import { ReactNode, useState } from 'react';
import { classNames } from '@/utils';
import { BiShocked, BiX } from 'react-icons/bi';
import LogoEmprega from '@/components/layout/LogoEmprega';
import { NivelUsuario, useAuthStore } from '@/store/auth';
import { NavMobileGuest } from '@/components/layout/NavBar/NavGuest';
import { useRouter } from 'next/router';
import { toastCustom } from '@/utils/toasts';
import { NavMobileAdmin } from '@/components/layout/NavBar/NavAdmin';
import { NavMobileEmpregador } from '@/components/layout/NavBar/NavEmpregador';
import { NavMobileCandidato } from '@/components/layout/NavBar/NavCandidato';

type Props = { children: ReactNode; className?: string };

const Drawer = ({ children, className }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    toastCustom('Logout realizado!', <BiShocked className="text-xl" />);
    await router.push('/');
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const navNivelUsuario = () => {
    if (!user || !Object.values(NivelUsuario).includes(user?.nivel_usuario))
      return <NavMobileGuest close={closeDrawer} />;
    if (user?.nivel_usuario <= NivelUsuario.ADMIN)
      return (
        <NavMobileAdmin
          close={closeDrawer}
          user={user}
          logout={logoutHandler}
        />
      );
    if (user?.nivel_usuario === NivelUsuario.EMPREGADOR)
      return (
        <NavMobileEmpregador
          close={closeDrawer}
          user={user}
          logout={logoutHandler}
        />
      );
    if (user?.nivel_usuario === NivelUsuario.CANDIDATO)
      return (
        <NavMobileCandidato
          close={closeDrawer}
          user={user}
          logout={logoutHandler}
        />
      );
  };

  return (
    <div className={classNames('drawer drawer-end', className)}>
      <input
        id="drawer-navbar"
        type="checkbox"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side lg:hidden">
        <span className="drawer-overlay"></span>

        <div className="menu p-2 w-full bg-neutral text-white">
          <div className="flex justify-between items-center gap-x-4 w-full">
            <LogoEmprega className="w-60" />
            <label htmlFor="drawer-navbar" className="drawer-overlay">
              <BiX className="text-5xl" />
            </label>
          </div>
          <div className="mt-4">{navNivelUsuario()}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
