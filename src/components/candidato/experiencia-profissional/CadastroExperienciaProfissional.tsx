import InputField from '@/components/atoms/InputField';
import TextAreaField from '@/components/atoms/TextAreaField';
import ToggleField from '@/components/atoms/ToggleField';
import InputCargo from '@/components/atoms/inputs/InputCargo';
import InputSalario from '@/components/atoms/inputs/InputSalario';
import InputDate from '@/components/atoms/inputs/InputDate';

type Props = {
  register: any;
  errors: any;
  watch: any;
};

const CadastroExperienciaProfissional = ({
  register,
  errors,
  watch,
}: Props) => {
  return (
    <>
      <InputField
        label="Empresa"
        name="empresa"
        register={register}
        placeholder="Ex: Google"
        options={{
          required: true,
        }}
        error={errors.empresa?.message}
      />
      <InputCargo register={register} error={errors.cargo?.message} required />
      <InputSalario register={register} error={errors.salario?.message} />
      <InputDate
        label="Data de início"
        name="data_inicio"
        register={register}
        required
        error={errors.data_inicio?.message}
      />
      <InputDate
        label="Data de término"
        name="data_fim"
        register={register}
        error={errors.data_fim?.message}
        required={!watch('data_atual', false)}
        options={{
          disabled: watch('data_atual', false),
        }}
      />
      <ToggleField
        label={'Estou trabalhando'}
        name={'data_atual'}
        register={register}
      />
      <TextAreaField
        label="Atividades"
        name="atividades"
        register={register}
        options={{
          required: true,
        }}
        placeholder="Descrição das atividades envolvidas no cargo"
        error={errors.atividades?.message}
      />
    </>
  );
};

export default CadastroExperienciaProfissional;
