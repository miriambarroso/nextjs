import InputField from '@/components/atoms/InputField';
import { cpfMask } from '@/utils/masks';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
};

const InputCPF = ({
  register,
  error,
  required = false,
  label = 'CPF',
  name = 'cpf',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: 000.000.000-00"
        error={error}
        options={{ required: required, onChange: cpfMask.onChange }}
      />
    </>
  );
};

export default InputCPF;
