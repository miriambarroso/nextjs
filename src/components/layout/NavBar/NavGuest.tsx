import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';
import DrawerDropdown from '@/components/atoms/drawer/DrawerDropdown';
import DrawerLink from '@/components/atoms/drawer/DrawerLink';

type Props = {};

const dropdownEmpresas = [
  [
    { name: 'Cadastrar', href: '/empresa/cadastrar' },
    { name: 'Vaga', href: '/vaga/cadastrar' },
  ],
];

const dropdownCandidatos = [
  [
    { name: 'Cadastrar', href: '/candidato/cadastrar' },
    {
      name: 'Objetivo Profissional',
      href: '/candidato/objetivo-profissional/cadastrar',
    },
    {
      name: 'Formação Acadêmica',
      href: '/candidato/formacao-academica/cadastrar',
    },
    {
      name: 'Experiência Profissional',
      href: '/candidato/experiencia-profissional/cadastrar',
    },
    {
      name: 'Curso e Especialização',
      href: '/candidato/curso-especializacao/cadastrar',
    },
    { name: 'Idioma', href: '/candidato/idioma/cadastrar' },
  ],
];

const NavGuest = ({}: Props) => {
  return (
    <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
      {/*<li>*/}
      {/*  <DropdownNav content={'Empresas'} items={dropdownEmpresas} />*/}
      {/*</li>*/}
      {/*<li>*/}
      {/*  <DropdownNav content={'Candidatos'} items={dropdownCandidatos} />*/}
      {/*</li>*/}
      <li>
        <Link href="/sobre">Sobre</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li className="items-center">
        <Link
          href="/candidato/cadastrar"
          className="btn text-base-100 uppercase btn-sm py-0"
        >
          Cadastre-se
        </Link>
      </li>
    </ul>
  );
};

const NavMobileGuest = ({ close }: { close: () => void }) => {
  return (
    <>
      <DrawerDropdown
        items={dropdownCandidatos}
        name={'Candidatos'}
        onClick={close}
      />
      <DrawerDropdown
        items={dropdownEmpresas}
        name={'Empresas'}
        onClick={close}
      />

      <DrawerLink href="/login" onClick={close} className="border-none">
        Login
      </DrawerLink>
      <DrawerLink onClick={close} href="/sobre">
        Sobre
      </DrawerLink>
      <DrawerLink
        className="bg-primary rounded border-none"
        href="/candidato/cadastrar"
        onClick={close}
      >
        Cadastre-se
      </DrawerLink>
    </>
  );
};

export { NavGuest, NavMobileGuest };
