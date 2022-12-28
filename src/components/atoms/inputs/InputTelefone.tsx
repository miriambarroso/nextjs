import { phoneMask } from '@/utils/masks';
import InputField from '@/components/atoms/InputField';

type Props = {
  register;
  error;
  required: boolean;
  label?: string;
  name?: string;
};

const InputTelefone = ({
  register,
  error,
  required,
  label = 'Telefone',
  name = 'telefone',
}: Props) => {
  return (
    <>
      <InputField
        label={label}
        name={name}
        register={register}
        placeholder="Ex: (00) 0000-0000"
        error={error}
        options={{
          required: required,
          onChange: phoneMask.onChange,
        }}
      />
    </>
  );
};

export default InputTelefone;
