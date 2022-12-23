import { BiMenuAltRight, BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import LogoAnapolis from '@/components/layout/LogoAnapolis';
import LogoEmprega from '@/components/layout/LogoEmprega';
import { useState } from 'react';
import Dropdown from '@/components/atoms/Dropdown';

type Props = {};

const NavBar = ({}: Props) => {
  const [term, setTerm] = useState<string>('');
  const searchTerm = () => {
    console.log('searchTerm');
  };

  const dropdownEmpresas = [
    [
      { name: 'Cadastrar', href: '/empresa/cadastro' },
      { name: 'Vaga', href: '/vaga/cadastro' },
    ],
  ];

  const dropdownCandidatos = [
    [
      { name: 'Cadastrar', href: '/candidato/cadastro' },
      {
        name: 'Objetivo Profissional',
        href: '/candidato/objetivo-profissional',
      },
      { name: 'Formação Acadêmica', href: '/candidato/formacao-academica' },
      {
        name: 'Experiência Profissional',
        href: '/candidato/experiencia-profissional',
      },
      {
        name: 'Curso e Especialização',
        href: '/candidato/curso-especializacao',
      },
      { name: 'Idioma', href: '/candidato/idioma' },
    ],
  ];

  return (
    <>
      <div className="bg-white">
        <div className="navbar container ">
          <div className="navbar-start space-x-4">
            <LogoEmprega className="h-20 w-60 text-neutral" />
            <LogoAnapolis className="h-20 w-48 hidden 2xl:block" />
          </div>
          <div className="navbar-center hidden xl:block">
            <div className="form-control relative">
              <label>
                <input
                  type="search"
                  placeholder="Ex: Cargo, Empresa, Palavra-chave"
                  className="input rounded-full w-96 h-full py-2"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <button
                  className="absolute top-0 right-0 mr-2 mt-1 text-neutral cursor-pointer p-2"
                  onClick={searchTerm}
                >
                  <BiSearch />
                </button>
              </label>
            </div>
          </div>
          <div className="navbar-end">
            <label htmlFor="drawer-navbar" className="drawer-overlay lg:hidden">
              <BiMenuAltRight className="text-4xl" />
            </label>
            <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
              <li>
                <Dropdown name={'Empresas'} items={dropdownEmpresas} />
              </li>
              <li>
                <Dropdown name={'Candidatos'} items={dropdownCandidatos} />
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li className="items-center">
                <Link
                  href="/candidato/cadastro"
                  className="btn text-base-100 uppercase btn-sm py-0"
                >
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white xl:hidden navbar">
        <div className="navbar-center container">
          <div className="form-control w-full relative">
            <label>
              <input
                type="search"
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
