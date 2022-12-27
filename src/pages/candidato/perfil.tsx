import { BiMailSend, BiPhone, BiUser } from 'react-icons/bi';
import { cpfMask, phoneMask } from '@/utils/masks';
import CandidatoService from '@/services/CandidatoService';
import { toastError } from '@/utils/toasts';
import { ReactNode, useEffect, useState } from 'react';
import { ICandidatoPerfil } from '@/interfaces/candidato';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import CardPerfilExperienciaProfissional from '@/components/candidato/perfil/CardPerfilExperienciaProfissional';
import CardPerfilObjetivoProfissional from '@/components/candidato/perfil/CardPerfilObjetivoProfissional';
import CardPerfilFormacaoAcademica from '@/components/candidato/perfil/CardPerfilFormacaoAcademica';
import CardPerfilCursoEspecializacao from '@/components/candidato/perfil/CardPerfilCursoEspecializacao';
import CardPerfilIdioma from '@/components/candidato/perfil/CardPerfilIdioma';
import Link from 'next/link';
import { CANDIDATO } from '@/store/auth';

type Props = {};

export const CardPerfil = ({
  title,
  button,
  children,
}: {
  title: string;
  button: { label: string; href: string };
  children: ReactNode;
}) => {
  return (
    <div className="rounded bg-white text-secondary p-4 space-y-4">
      <p className="font-noto-sans font-semibold">{title}</p>
      {children}
      <div>
        <Link href={button.href} className="btn btn-outline btn-neutral btn-sm">
          {button.label}
        </Link>
      </div>
    </div>
  );
};

const Page = ({}: Props) => {
  const [userProfile, setUserProfile] = useState<ICandidatoPerfil>(
    {} as ICandidatoPerfil,
  );

  const fetchUser = async () => {
    try {
      const data = await CandidatoService.perfil();
      setUserProfile(data);
    } catch (e) {
      toastError(e.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="mb-8 mt-4 mx-auto max-w-3xl">
        <div className="label">
          <span className="label-text">Seu currículo</span>
        </div>
        <div className="space-y-4">
          <div className="rounded bg-neutral text-white p-4">
            <p className="font-noto-sans font-semibold">Dados Cadastrais</p>
            <div>
              <BiUser className="inline-block" />{' '}
              <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
                {userProfile?.nome}
              </TextSkeleton>
            </div>
            <div>
              <BiUser className="inline-block" />{' '}
              <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
                {userProfile?.cpf ? cpfMask.mask(userProfile?.cpf) : null}
              </TextSkeleton>
            </div>
            <div>
              <BiMailSend className="inline-block" />
              <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
                {userProfile?.email}
              </TextSkeleton>
            </div>
            <div>
              <BiPhone className="inline-block" />{' '}
              <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
                {userProfile?.telefone
                  ? phoneMask.mask(userProfile?.telefone)
                  : null}
              </TextSkeleton>
            </div>
            <div className="mt-4">
              <Link
                href={`/candidato/${userProfile?.id}/editar`}
                className="btn btn-outline btn-white btn-sm"
              >
                Editar dados cadastrais
              </Link>
            </div>
          </div>
          <CardPerfilObjetivoProfissional
            objetivo_profissional={userProfile?.objetivo_profissional}
          />
          <CardPerfilFormacaoAcademica
            formacao_academica={userProfile?.formacao_academica}
          />
          <CardPerfilExperienciaProfissional
            experiencia_profissional={userProfile?.experiencia_profissional}
          />
          <CardPerfilCursoEspecializacao
            curso_especializacao={userProfile?.curso_especializacao}
          />
          <CardPerfilIdioma idioma={userProfile?.idioma} />
        </div>
      </div>
    </>
  );
};

Page.permissions = [CANDIDATO];

export default Page;
