import InputField from '@/components/atoms/InputField';
import { numberMask } from '@/utils/masks';

type Props = {
  register: any;
  errors: any;
};

const CadastroCursoEspecializacao = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Instituição de Ensino"
        name="instituicao"
        register={register}
        placeholder="Ex: Instituto Federal de Educação, Ciência e Tecnologia de Goiás"
        error={errors.instituicao?.message}
      />
      <InputField
        label="Curso"
        name="curso"
        register={register}
        placeholder="Ex: Análise e Desenvolvimento de Sistemas"
        error={errors.curso?.message}
      />
      <InputField
        label="Nível de Formação"
        name="nivel"
        register={register}
        placeholder="Ex: Superior"
        error={errors.nivel?.message}
      />
      <InputField
        label="Data de Conclusão"
        name="data_conclusao"
        register={register}
        placeholder="Ex: 01/01/2024"
        error={errors.data_conclusao?.message}
      />
      <InputField
        label={'Tempo de duração'}
        name={'duracao_horas'}
        register={register}
        placeholder={'Ex: 2.000 horas'}
        options={{
          onChange: numberMask.onChange,
        }}
        type="number"
        error={errors.duracao_horas?.message}
      />
      <InputField
        label={'Certificado'}
        name={'certificado'}
        register={register}
        error={errors.certificado?.message}
      />
    </>
  );
};

export default CadastroCursoEspecializacao;
