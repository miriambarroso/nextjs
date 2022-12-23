import InputField from '@/components/atoms/InputField';
import TextAreaField from '@/components/atoms/TextAreaField';
import { currencyMask } from '@/utils/masks';
import ToggleField from '@/components/atoms/ToggleField';

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
      <InputField
        label="Cargo"
        name="cargo"
        register={register}
        placeholder="Ex: Desenvolvedor"
        options={{
          required: true,
        }}
        error={errors.cargo?.message}
      />
      <InputField
        label={'Salário'}
        name={'salario'}
        register={register}
        placeholder={'Ex: R$ 2.000,00'}
        options={{
          onChange: currencyMask.onChange,
        }}
        error={errors.salario?.message}
      />
      <InputField
        label="Data de início"
        name="data_inicio"
        register={register}
        type="date"
        options={{
          required: true,
        }}
        placeholder="Ex: 01/01/2020"
        error={errors.data_inicio?.message}
      />
      <InputField
        label="Data de término"
        name="data_fim"
        register={register}
        type="date"
        options={{
          required: !watch('data_atual', false),
        }}
        placeholder="Ex: 01/01/2024"
        inputProps={{
          disabled: watch('data_atual', false),
        }}
        error={errors.data_fim?.message}
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
