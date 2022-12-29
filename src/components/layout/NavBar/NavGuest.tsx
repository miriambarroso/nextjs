import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';

type Props = {};

const NavGuest = ({}: Props) => {
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

  return (
    <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
      <li>
        <DropdownNav content={'Empresas'} items={dropdownEmpresas} />
      </li>
      <li>
        <DropdownNav content={'Candidatos'} items={dropdownCandidatos} />
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

export default NavGuest;
