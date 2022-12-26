import { BiMailSend, BiPhone, BiUser } from 'react-icons/bi';
import { cpfMask, currencyMask, phoneMask } from '@/utils/masks';
import CandidatoService from '@/services/CandidatoService';
import { toastError } from '@/utils/toasts';
import { ReactNode, useEffect, useState } from 'react';
import { ICandidatoPerfil } from '@/interfaces/candidato';
import {
  FormacaoNivelChoices,
  IdiomaNivelChoices,
  JornadaTrabalhoChoices,
  RegimeContratualChoices,
} from '@/utils/choices';
import _ from 'lodash';
import { classNames } from '@/utils';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { IFormacaoAcademica } from '@/interfaces/formacaoAcademica';
import { IExperienciaProfissional } from '@/interfaces/experienciaProfissional';
import { ICursoEspecializacao } from '@/interfaces/cursoEspecializacao';
import { IIdioma } from '@/interfaces/idioma';

type Props = {};

const CardPerfil = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="rounded bg-white text-secondary p-4">
      <p className="font-noto-sans font-semibold">{title}</p>
      {children}
    </div>
  );
};

const CardSkeleton = ({ title }: { title: string }) => {
  return (
    <CardPerfil title={title}>
      <div className={'space-y-4 mt-4 divide-y divide-base-100'}>
        <div className={'flex flex-col gap-y-2 '}>
          <TextSkeleton className="h-4 w-1/2 bg-base-100" />
          <TextSkeleton className="h-4 w-1/2 bg-base-100" />
          <TextSkeleton className="h-4 w-1/2 bg-base-100" />
        </div>
      </div>
    </CardPerfil>
  );
};

const CardExperienciaProfissional = ({
  candidato,
}: {
  candidato: ICandidatoPerfil;
}) => {
  const [items, setItems] = useState<IExperienciaProfissional[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setItems(candidato.formacao_academica);
  //   setLoading(false);
  // }, [candidato]);

  if (loading) {
    return <CardSkeleton title={'Experiência Profissional'} />;
  }

  return (
    <CardPerfil title={'Experiência Profissional'}>
      <div className={'space-y-2 mt-4 divide-y divide-gray-100'}>
        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {item.cargo}, {item.empresa}
              </p>
              <p>
                {item.data_inicio} - {item.data_fim}
              </p>
              <p>{item.atividades}</p>
            </div>
          ))}
      </div>
    </CardPerfil>
  );
};

const CardFormacaoAcademica = ({
  candidato,
}: {
  candidato: ICandidatoPerfil;
}) => {
  const [items, setItems] = useState<IFormacaoAcademica[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setItems(candidato.formacao_academica);
  //   setLoading(false);
  // }, [candidato]);

  if (loading) {
    return <CardSkeleton title={'Formação Academica'} />;
  }

  return (
    <CardPerfil title={'Formação Academica'}>
      <div className={'space-y-2 mt-4 divide-y divide-gray-100'}>
        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {FormacaoNivelChoices.findByIntValue(item.nivel)?.label},{' '}
                {item.curso}
              </p>
              <p>{item.instituicao}</p>
              <p>
                {item.data_inicio} - {item.data_conclusao}
              </p>
            </div>
          ))}
      </div>
    </CardPerfil>
  );
};

const CardCursoEspecializacao = ({
  candidato,
}: {
  candidato: ICandidatoPerfil;
}) => {
  const [items, setItems] = useState<ICursoEspecializacao[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setItems(candidato.formacao_academica);
  //   setLoading(false);
  // }, [candidato]);

  if (loading) {
    return <CardSkeleton title={'Curso e Especialização'} />;
  }

  return (
    <CardPerfil title={'Curso e Especialização'}>
      <div className={'space-y-2 mt-4 divide-y divide-gray-100'}>
        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {item.curso}
              </p>
              <p>{item.instituicao}</p>
              <p>
                {item.data_conclusao} - {item.duracao_horas}H
              </p>
            </div>
          ))}
      </div>
    </CardPerfil>
  );
};

const CardIdioma = ({ candidato }: { candidato: ICandidatoPerfil }) => {
  const [items, setItems] = useState<IIdioma[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setItems(candidato.formacao_academica);
  //   setLoading(false);
  // }, [candidato]);

  if (loading) {
    return (
      <CardPerfil title={'Idioma'}>
        <div className={'space-y-4 mt-4 divide-y divide-base-100'}>
          <div className={'flex flex-col gap-y-2 '}>
            <TextSkeleton className="h-4 w-1/2 bg-base-100" />
          </div>
        </div>
      </CardPerfil>
    );
  }

  return (
    <CardPerfil title={'Idioma'}>
      <div className={'space-y-2 mt-4 divide-y divide-gray-100'}>
        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {item.nome} -{' '}
                {IdiomaNivelChoices.findByIntValue(item.nivel)?.label}
              </p>
            </div>
          ))}
      </div>
    </CardPerfil>
  );
};

const CardObjetivoProfissional = ({
  candidato,
}: {
  candidato: ICandidatoPerfil;
}) => {
  const [items, setItems] = useState<{ label: string; value: string }[]>(
    [
      'Cargo pretendido',
      'Pretensão salarial',
      'Jornada de trabalho',
      'Regime contratual',
    ].map((label) => ({ label, value: null })),
  );

  useEffect(() => {
    if (!_.isEmpty(candidato)) {
      setItems([
        {
          label: 'Cargo pretendido',
          value: candidato?.objetivo_profissional.cargo ?? '',
        },
        {
          label: 'Pretensão salarial',
          value: currencyMask.mask(
            parseFloat(candidato?.objetivo_profissional.salario)
              .toFixed(2)
              .replace('.', ','),
          ),
        },
        {
          label: 'Regime de contratação',
          value: RegimeContratualChoices.findByIntValue(
            candidato?.objetivo_profissional.regime_contratual,
          )?.label,
        },
        {
          label: 'Jornada de trabalho',
          value: JornadaTrabalhoChoices.findByIntValue(
            candidato?.objetivo_profissional.jornada_trabalho,
          )?.label,
        },
      ]);
    }
  }, [candidato]);

  return (
    <CardPerfil title={'Objetivo Profissional'}>
      <div
        className={classNames(
          _.isEmpty(candidato) && 'animate-pulse',
          'space-y-2 mt-4',
        )}
      >
        {items.map((i, index) => {
          return (
            <div key={index}>
              <p className="font-noto-sans text-sm text-secondary/60 ">
                {i.label}
              </p>
              <TextSkeleton className="h-4 w-[180px] bg-base-100">
                {i.value}
              </TextSkeleton>
            </div>
          );
        })}
      </div>
    </CardPerfil>
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
      <div className="mb-8 mt-4">
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
                {cpfMask.mask(userProfile?.cpf || '')}
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
                {phoneMask.mask(userProfile?.telefone || '')}
              </TextSkeleton>
            </div>
          </div>
          <CardObjetivoProfissional candidato={userProfile} />
          <CardFormacaoAcademica candidato={userProfile} />
          <CardExperienciaProfissional candidato={userProfile} />
          <CardCursoEspecializacao candidato={userProfile} />
          <CardIdioma candidato={userProfile} />
        </div>
      </div>
    </>
  );
};

export default Page;
