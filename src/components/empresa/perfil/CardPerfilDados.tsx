import { BiChair, BiMailSend, BiUser } from 'react-icons/bi';
import TextSkeleton from '@/components/skeleton/TextSkeleton';
import { cpfMask } from '@/utils/masks';
import { IEmpregador } from '@/interfaces/empregador';
import CardPerfil from '@/components/atoms/CardPerfil';

type Props = { empregador: IEmpregador };

const CardPerfilDados = ({ empregador }: Props) => {
  return (
    <>
      <CardPerfil
        title={'Dados Cadastrais'}
        button={{
          label: 'Editar dados cadastrais',
          href: `/empresa/empregador/${empregador.id}/editar`,
        }}
        cardClassName="bg-neutral text-white"
        btnClassName="btn-white"
      >
        <div>
          <BiUser className="inline-block" />{' '}
          <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
            {empregador?.nome}
          </TextSkeleton>
        </div>
        <div>
          <BiUser className="inline-block" />{' '}
          <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
            {empregador?.cpf ? cpfMask.mask(empregador?.cpf) : null}
          </TextSkeleton>
        </div>
        <div>
          <BiMailSend className="inline-block" />
          <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
            {empregador?.email}
          </TextSkeleton>
        </div>
        <div>
          <BiChair className="inline-block" />{' '}
          <TextSkeleton className="h-4 w-[180px] bg-base-100 ml-2">
            {empregador?.cargo}
          </TextSkeleton>
        </div>
      </CardPerfil>
    </>
  );
};

export default CardPerfilDados;
