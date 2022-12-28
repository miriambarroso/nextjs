import InputField from '@/components/atoms/InputField';
import { cnpjMask } from '@/utils/masks';

type Props = { register; error; required: boolean };

const InputCNPJ = ({ register, error, required }: Props) => {
  return (
    <InputField
      label="CNPJ"
      name="cnpj"
      register={register}
      placeholder="Ex: 00.000.000/0000-00"
      error={error}
      options={{
        required: required,
        onChange: cnpjMask.onChange,
      }}
    />
  );
};

export default InputCNPJ;
