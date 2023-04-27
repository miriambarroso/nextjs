import { toastError } from '@/utils/toasts';
import { useEffect, useState } from 'react';
import { EMPREGADOR } from '@/store/auth';
import EmpregadorService from '@/services/EmpregadorService';
import CardPerfilDados from '@/components/empresa/perfil/CardPerfilDados';
import CardPerfilEmpresa from '@/components/empresa/perfil/CardPerfilEmpresa';
import { IEmpregadorPerfil } from '@/interfaces/empregador';
import CardPerfilEndereco from '@/components/empresa/perfil/CardPerfilEndereco';
import useOnUser from '@/hooks/useOnUser';

type Props = {};

const Page = ({}: Props) => {
  const [userProfile, setUserProfile] = useState<IEmpregadorPerfil>(
    {} as IEmpregadorPerfil,
  );

  const fetchUser = async () => {
    try {
      const data = await EmpregadorService.perfil();
      setUserProfile(data);
    } catch (e) {
      toastError(e.message);
    }
  };

  useOnUser(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="mb-8 mt-4 mx-auto max-w-3xl">
        <div className="label">
          <span className="label-text">Seus dados</span>
        </div>
        <div className="space-y-4">
          <CardPerfilDados empregador={userProfile} />
          <CardPerfilEmpresa empresa={userProfile?.empresa} />
          <CardPerfilEndereco endereco={userProfile?.endereco} />
        </div>
      </div>
    </>
  );
};

Page.permissions = [EMPREGADOR];

export default Page;
