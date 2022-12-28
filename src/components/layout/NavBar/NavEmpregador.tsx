import { BiLogOut } from 'react-icons/bi';
import Link from 'next/link';
import DropdownNav from '@/components/layout/DropdownNav';
import Image from 'next/image';
import { IUser } from '@/interfaces/user';

type Props = {
  user: IUser;
  logout: () => Promise<void>;
};

const NavEmpregador = ({ user, logout }: Props) => {
  const dropdownItems = [
    [
      {
        name: 'Meu Perfil',
        href: '/empresa/perfil',
      },
    ],
    [
      {
        name: 'Vagas',
        href: '/empresa/vaga/cadastrar',
      },
    ],
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
        <Link href="/dashboard">Painel</Link>
      </li>
      <li className="items-center inline-flex space-x-2">
        <DropdownNav
          items={dropdownItems}
          name={
            <>
              <div className="text-right">
                <p className="text-neutral">{user?.nome}</p>
                <p className="text-sm">Empregador</p>
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

export default NavEmpregador;
