import { BiChevronDown, BiSearch } from 'react-icons/bi';
import Link from 'next/link';

type Props = {};

const NavBar = ({}: Props) => {
  return (
    <>
      <div className="bg-white">
        <div className="navbar container ">
          <div className="navbar-start">
            <Link href="/" className="text-neutral">
              Emprega Anápolis
            </Link>
          </div>
          <div className="navbar-center">
            <div className="form-control relative">
              <label>
                <input
                  type="text"
                  placeholder="Pesquise pelo cargo, palavra-chave ou empresa"
                  className="input rounded-full  w-96 h-full py-2"
                />
                <BiSearch className="absolute top-0 right-0 mr-4 mt-3 text-neutral " />
              </label>
            </div>
          </div>
          <div className="navbar-end">
            <ul className="list flex items-center space-x-8 px-1 text-neutral ">
              <li>
                <Link href="/empresas" className="text-secondary">
                  Empresas
                  <BiChevronDown className="inline-block" />
                </Link>
              </li>
              <li>
                <Link href="/candidatos" className="text-secondary">
                  Candidatos
                  <BiChevronDown className="inline-block" />
                </Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li className="items-center">
                <a className="btn text-base-100 uppercase btn-sm py-0">
                  Cadastre-se
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-neutral navbar">
        <div className="navbar-center container">
          <ul className="menu menu-horizontal text-white">
            <li>
              <a>Vagas</a>
            </li>
            <li>
              <a>Cursos</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
