import { BiCog, BiLogOut } from 'react-icons/bi';
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
      href: '/empresa/perfil',
      icon: BiCog,
    },
  ],
  [
    {
      name: 'Cadastrar Vaga',
      href: '/empresa/vaga/cadastrar',
    },
    {
      name: 'Listar Vagas',
      href: '/empresa/vagas',
    },
  ],
];

const NavEmpregador = ({ user, logout }: Props) => {
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
        <Link href="/empresa/painel">Painel</Link>
      </li>
      <li>
        <Link href="/sobre-nos">Sobre Nós</Link>
      </li>
      <li>
        <DropdownNav
          items={accordion}
          content={<NavProfileAvatar user={user} />}
        />
      </li>
    </ul>
  );
};

const NavMobileEmpregador = ({
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
              src="https://placeimg.com/400/225/arch"
              fill
              alt="Retrato do Usuário"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white">{user?.nome}</p>
        </div>
      </div>
      <DrawerLink onClick={close} href="/empresa/painel">
        Painel
      </DrawerLink>
      <DrawerLink onClick={close} href="/empresa/painel">
        Sobre nós
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

export { NavEmpregador, NavMobileEmpregador };
