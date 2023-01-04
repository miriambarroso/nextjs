import InputSalario from '@/components/atoms/inputs/InputSalario';
import ChoiceCheckboxBeneficio from '@/components/atoms/inputs/ChoiceCheckboxBeneficio';

type Props = {
  register: any;
  errors: any;
  beneficios?: any;
};

const CadastroVagaSalarioBeneficios = ({
  register,
  errors,
  beneficios,
}: Props) => {
  return (
    <>
      <InputSalario
        register={register}
        error={errors.salario?.message}
        required
      />
      <ChoiceCheckboxBeneficio
        register={register}
        error={errors.beneficios?.message}
        beneficios={beneficios}
      />
    </>
  );
};

export default CadastroVagaSalarioBeneficios;
