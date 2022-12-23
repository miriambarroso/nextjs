import { BiChevronDown, BiMenuAltRight, BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import LogoAnapolis from '@/components/layout/LogoAnapolis';
import LogoEmprega from '@/components/layout/LogoEmprega';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

type Props = {};

type DropdownItem = {
  name: string;
  href: string;
  icon?: any;
};

type DropdownProps = {
  items: DropdownItem[][];
  name: string;
};

const Dropdown = ({ items, name }: DropdownProps) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left z-10 text-secondary"
    >
      <div>
        <Menu.Button className="inline-flex items-center ">
          {name}
          <BiChevronDown className={'text-xl'} />
          {/*<ChevronDownIcon*/}
          {/*  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"*/}
          {/*  aria-hidden="true"*/}
          {/*/>*/}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item, index) => (
            <div key={index} className="px-1 py-1 ">
              {item.map((subItem, subIndex) => (
                <Menu.Item key={subIndex}>
                  {({ active }) => (
                    <Link
                      href={subItem.href}
                      className={`${
                        active ? 'bg-base-300 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {/*{active ? (*/}
                      {/*  <EditActiveIcon*/}
                      {/*    className="mr-2 h-5 w-5"*/}
                      {/*    aria-hidden="true"*/}
                      {/*  />*/}
                      {/*) : (*/}
                      {/*  <EditInactiveIcon*/}
                      {/*    className="mr-2 h-5 w-5"*/}
                      {/*    aria-hidden="true"*/}
                      {/*  />*/}
                      {/*)}*/}
                      {subItem.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const NavBar = ({}: Props) => {
  const [term, setTerm] = useState<string>('');
  const searchTerm = () => {
    console.log('searchTerm');
  };

  const dropdownEmpresas = [
    [
      { name: 'Cadastrar', href: '/empresa/cadastro' },
      { name: 'Contato', href: '/contato' },
    ],
  ];

  const dropdownCandidatos = [
    [
      { name: 'Cadastrar', href: '/candidato/cadastro' },
      { name: 'Contato', href: '/contato' },
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
