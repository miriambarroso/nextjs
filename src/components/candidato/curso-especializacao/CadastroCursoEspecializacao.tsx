import InputInstituicao from '@/components/atoms/inputs/InputInstituicao';
import InputCurso from '@/components/atoms/inputs/InputCurso';
import InputDate from '@/components/atoms/inputs/InputDate';
import InputDuracaoHoras from '@/components/atoms/inputs/InputDuracaoHoras';
import InputFileField from '@/components/atoms/InputFileField';

type Props = {
  register: any;
  errors: any;
};

const CadastroCursoEspecializacao = ({ register, errors }: Props) => {
  return (
    <>
      <InputInstituicao
        register={register}
        error={errors.instituicao?.message}
        required
      />
      <InputCurso register={register} error={errors.curso?.message} required />
      <InputDate
        label="Data de conclusão"
        name="data_conclusao"
        register={register}
        required
        error={errors.data_conclusao?.message}
      />
      <InputDuracaoHoras
        register={register}
        error={errors.duracao_horas?.message}
        required
      />
      <InputFileField
        label="Certificado"
        name="certificado"
        register={register}
        inputProps={{
          accept: '.pdf',
        }}
        error={errors.certificado?.message}
      />
    </>
  );
};

export default CadastroCursoEspecializacao;
