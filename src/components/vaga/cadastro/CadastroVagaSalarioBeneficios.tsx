import InputField from '@/components/atoms/InputField';
import { currencyMask } from '@/utils/masks';

type Props = {
  register: any;
  errors: any;
};

const CadastroVagaSalarioBeneficios = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label={'Salário mensal'}
        name={'salario'}
        register={register}
        placeholder={'Ex: R$ 2.000,00'}
        options={{
          onChange: currencyMask.onChange,
        }}
        error={errors.salario?.message}
      />
    </>
  );
};

export default CadastroVagaSalarioBeneficios;
