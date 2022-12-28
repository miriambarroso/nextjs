import InputField from '@/components/atoms/InputField';
import { numberMask } from '@/utils/masks';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputNumeroFuncionarios = ({
  register,
  error,
  required = false,
  label = 'Número de Funcionários',
  name = 'numero_funcionarios',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: 100"
        options={{
          onChange: numberMask.onChange,
          required: required,
        }}
        error={error}
      />
    </>
  );
};

export default InputNumeroFuncionarios;
