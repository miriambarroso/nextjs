import { BiLogOut } from 'react-icons/bi';
import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';
import Image from 'next/image';
import { IUser } from '@/interfaces/user';
import DrawerDropdown from '@/components/atoms/drawer/DrawerDropdown';

type Props = {
  user: IUser;
  logout: () => Promise<void>;
};

const dropdownItems = [
  [
    {
      name: 'Meu Perfil',
      href: '/admin/profile',
    },
  ],
  [
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

const NavAdmin = ({ user, logout }: Props) => {
  const dropdown = [
    ...dropdownItems,
    [
      {
        name: 'Sair',
        action: logout,
        icon: BiLogOut,
      },
    ],
  ];

  return (
    <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
      <li>
        <Link href="/painel">Painel</Link>
      </li>
      <li className="items-center inline-flex space-x-2">
        <DropdownNav
          items={dropdown}
          content={
            <>
              <div className="text-right">
                <p className="text-neutral">{user?.nome}</p>
                <p className="text-sm">Administrador</p>
              </div>
              <div className="avatar">
                <div className="w-12 rounded-full relative">
                  <Image src="" fill alt="Retrato do Usuário" />
                </div>
              </div>
            </>
          }
        />
      </li>
    </ul>
  );
};

const NavMobileAdmin = ({
  close,
  user,
  logout,
}: {
  close: () => void;
  user: IUser;
  logout: () => Promise<void>;
}) => {
  const accordion = [
    ...dropdownItems,
    [
      {
        name: 'Sair',
        action: logout,
        icon: BiLogOut,
      },
    ],
  ];

  return (
    <>
      <DrawerDropdown items={accordion} name={'Candidatos'} onClick={close} />
    </>
  );
};

export { NavAdmin, NavMobileAdmin };
