import { BiMenuAltRight, BiSearch, BiShocked } from 'react-icons/bi';
import LogoAnapolis from '@/components/layout/LogoAnapolis';
import LogoEmprega from '@/components/layout/LogoEmprega';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/router';
import { NavGuest } from '@/components/layout/NavBar/NavGuest';
import { NavAdmin } from '@/components/layout/NavBar/NavAdmin';
import { NavEmpregador } from '@/components/layout/NavBar/NavEmpregador';
import { NavCandidato } from '@/components/layout/NavBar/NavCandidato';
import { toastCustom } from '@/utils/toasts';

type Props = {};

const NavBar = ({}: Props) => {
  const [user, isCandidato, isEmpregador, isAdmin] = useAuthStore((state) => [
    state.user,
    state.isCandidato,
    state.isEmpregador,
    state.isAdmin,
  ]);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    toastCustom('Logout realizado!', <BiShocked className="text-xl" />);
    await router.push('/');
  };

  const [term, setTerm] = useState<string>('');

  const searchTerm = (event) => {
    event?.preventDefault();

    if (isEmpregador()) {
      return router.push({
        pathname: '/candidatos',
        query: { termo: term },
      });
    }

    return router.push({
      pathname: '/vagas',
      query: { termo: term },
    });
  };

  // useEffectTimeout(() => searchTerm(null), 1000, [term]);

  const navNivelUsuario = () => {
    if (isAdmin()) {
      return <NavAdmin user={user} logout={logoutHandler} />;
    }
    if (isEmpregador()) {
      return <NavEmpregador user={user} logout={logoutHandler} />;
    }
    if (isCandidato()) {
      return <NavCandidato user={user} logout={logoutHandler} />;
    }
    return <NavGuest />;
  };

  return (
    <>
      <div className="bg-white">
        <div className="navbar container ">
          <div className="navbar-start space-x-4">
            <LogoEmprega className="h-20 w-60 text-neutral" />
            <LogoAnapolis className="h-20 w-48 hidden 2xl:block" />
          </div>
          <div className="navbar-center hidden xl:block">
            <form onSubmit={searchTerm}>
              <div className="form-control relative">
                <label>
                  <input
                    type="text"
                    placeholder="Ex: Cargo, Empresa, Palavra-chave"
                    className="input rounded-full w-96 h-full py-2"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                  <button
                    className="absolute top-0 right-0 mr-2 mt-1 text-neutral cursor-pointer p-2"
                    type="submit"
                    onClick={searchTerm}
                  >
                    <BiSearch />
                  </button>
                </label>
              </div>
            </form>
          </div>
          <div className="navbar-end">
            <label htmlFor="drawer-navbar" className="drawer-overlay lg:hidden">
              <BiMenuAltRight className="text-4xl" />
            </label>
            {navNivelUsuario()}
          </div>
        </div>
      </div>
      <div className="bg-white xl:hidden navbar">
        <div className="navbar-center container">
          <div className="form-control w-full relative">
            <label>
              <input
                type="text"
                placeholder="Ex: Cargo, Empresa, Palavra-chave"
                className="input rounded-full w-full py-2"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button
                className="absolute top-0 right-0 mr-2 mt-2 text-neutral cursor-pointer p-2"
                onClick={searchTerm}
              >
                <BiSearch className="text-xl" />
              </button>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
