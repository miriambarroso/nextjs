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
        error={errors.empresa?.message}
      />
      <InputField
        label="Cargo"
        name="cargo"
        register={register}
        placeholder="Ex: Desenvolvedor"
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
        label="Data de Início"
        name="data_inicio"
        register={register}
        placeholder="Ex: 01/01/2020"
        error={errors.data_inicio?.message}
      />
      <InputField
        label="Data de Término"
        name="data_fim"
        register={register}
        placeholder="Ex: 01/01/2024"
        inputProps={{
          disabled: watch('data_atual', false),
        }}
        error={errors.data_termino?.message}
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
        placeholder="Descrição das atividades envolvidas no cargo"
        error={errors.atividades?.message}
      />
    </>
  );
};

export default CadastroExperienciaProfissional;
