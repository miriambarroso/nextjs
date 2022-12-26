import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';

type Props = {};

const NavGuest = ({}: Props) => {
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
    <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
      <li>
        <DropdownNav name={'Empresas'} items={dropdownEmpresas} />
      </li>
      <li>
        <DropdownNav name={'Candidatos'} items={dropdownCandidatos} />
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
  );
};

export default NavGuest;
