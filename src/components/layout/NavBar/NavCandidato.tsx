import { BiCog, BiLogOut, BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';
import Image from 'next/image';
import { IUser } from '@/interfaces/user';
import DrawerLink from '@/components/atoms/drawer/DrawerLink';
import NavProfileAvatar from '@/components/layout/NavBar/NavProfileAvatar';

type Props = {
  user: IUser;
  logout: () => Promise<void>;
};

const dropdownItems = [
  [
    {
      name: 'Meu Perfil',
      href: '/candidato/perfil',
      icon: BiCog,
    },
  ],
  // [
  //   {
  //     name: 'Objetivo Profissional',
  //     href: '/candidato/objetivo-profissional',
  //   },
  //   { name: 'Formação Acadêmica', href: '/candidato/formacao-academica' },
  //   {
  //     name: 'Experiência Profissional',
  //     href: '/candidato/experiencia-profissional',
  //   },
  //   {
  //     name: 'Curso e Especialização',
  //     href: '/candidato/curso-especializacao',
  //   },
  //   { name: 'Idioma', href: '/candidato/idioma' },
  // ],
  [
    {
      name: 'Buscar vagas',
      href: '/vagas',
      icon: BiSearch,
    },
  ],
];

const NavCandidato = ({ user, logout }: Props) => {
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
    <ul className="list hidden lg:flex items-center space-x-4 px-1 text-neutral ">
      <li>
        <Link href="/sobre">Sobre</Link>
      </li>
      <li>
        <Link href="/candidato/painel">Painel</Link>
      </li>
      <li className="items-center inline-flex space-x-2">
        <DropdownNav
          items={accordion}
          content={
            <DropdownNav
              items={accordion}
              content={<NavProfileAvatar user={user} />}
            />
          }
        />
      </li>
    </ul>
  );
};

const NavMobileCandidato = ({
  close,
  user,
  logout,
}: {
  close: () => void;
  user: IUser;
  logout: () => Promise<void>;
}) => {
  const accordion = [...dropdownItems];

  return (
    <>
      <div className="uppercase w-full justify-center items-center relative text-center font-noto-sans text-white gap-2 mb-4">
        <div className="avatar">
          <div className="w-20 rounded-full relative">
            <Image
              src="https://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg"
              fill
              alt="Retrato do Usuário"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white">{user?.nome}</p>
          <p className="text-sm text-base-300">Candidato</p>
        </div>
      </div>
      <DrawerLink onClick={close} href="/empresa/painel">
        Painel
      </DrawerLink>
      <DrawerLink onClick={close} href="/sobre">
        Sobre
      </DrawerLink>

      {accordion.map((item, index) =>
        item.map((i, ix) => (
          <DrawerLink key={ix} href={i?.href} onClick={close}>
            {i.name}
          </DrawerLink>
        )),
      )}
      <DrawerLink onClick={close} action={logout} className="border-none">
        Sair
      </DrawerLink>
    </>
  );
};

export { NavCandidato, NavMobileCandidato };
