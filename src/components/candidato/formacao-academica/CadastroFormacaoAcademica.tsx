import InputField from '@/components/atoms/InputField';
import ToggleField from '@/components/atoms/ToggleField';

type Props = {
  register: any;
  errors: any;
  watch: any;
};

const CadastroFormacaoAcademica = ({ register, errors, watch }: Props) => {
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
        label="Data de Início"
        name="data_inicio"
        register={register}
        placeholder="Ex: 01/01/2020"
        error={errors.data_inicio?.message}
      />

      <InputField
        label="Data de Conclusão"
        name="data_conclusao"
        register={register}
        inputProps={{
          disabled: watch('data_atual', false),
        }}
        placeholder="Ex: 01/01/2024"
        error={errors.data_conclusao?.message}
      />
      <ToggleField
        label={'Estou cursando'}
        name={'data_atual'}
        register={register}
      />
    </>
  );
};

export default CadastroFormacaoAcademica;
