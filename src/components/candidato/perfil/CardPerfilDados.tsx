import CardPerfil from '@/components/atoms/CardPerfil';
import { BiMailSend, BiPhone, BiUser } from 'react-icons/bi';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { cpfMask, phoneMask } from '@/utils/masks';
import { ICandidato } from '@/interfaces/candidato';

type Props = {
  candidato: ICandidato;
};

const CardPerfilDados = ({ candidato }: Props) => {
  return (
    <CardPerfil
      title={'Dados Cadastrais'}
      button={{
        label: 'Editar dados cadastrais',
        href: `/candidato/${candidato.id}/editar`,
      }}
      cardClassName="bg-neutral text-white"
      btnClassName="btn-white"
    >
      <div>
        <BiUser className="inline-block" />{' '}
        <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
          {candidato?.nome}
        </TextSkeleton>
      </div>
      <div>
        <BiUser className="inline-block" />{' '}
        <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
          {candidato?.cpf ? cpfMask.mask(candidato?.cpf) : null}
        </TextSkeleton>
      </div>
      <div>
        <BiMailSend className="inline-block" />
        <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
          {candidato?.email}
        </TextSkeleton>
      </div>
      <div>
        <BiPhone className="inline-block" />{' '}
        <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
          {candidato?.telefone ? phoneMask.mask(candidato?.telefone) : null}
        </TextSkeleton>
      </div>
    </CardPerfil>
  );
};

export default CardPerfilDados;
