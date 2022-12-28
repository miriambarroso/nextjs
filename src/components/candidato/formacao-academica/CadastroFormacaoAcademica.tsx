import ToggleField from '@/components/atoms/ToggleField';
import InputInstituicao from '@/components/atoms/inputs/InputInstituicao';
import InputCurso from '@/components/atoms/inputs/InputCurso';
import SelectNivelFormacao from '@/components/atoms/inputs/SelectNivelFormacao';
import InputDate from '@/components/atoms/inputs/InputDate';

type Props = {
  register: any;
  errors: any;
  watch: any;
};

const CadastroFormacaoAcademica = ({ register, errors, watch }: Props) => {
  return (
    <>
      <InputInstituicao
        register={register}
        error={errors.instituicao?.message}
        required
      />
      <InputCurso register={register} error={errors.curso?.message} required />
      <SelectNivelFormacao
        register={register}
        error={errors.nivel?.message}
        required
      />
      <InputDate
        label="Data de início"
        name="data_inicio"
        register={register}
        required
        error={errors.data_inicio?.message}
      />

      <InputDate
        label="Data de conclusão"
        name="data_conclusao"
        register={register}
        options={{
          disabled: watch('data_atual', false),
        }}
        required={!watch('data_atual', false)}
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
