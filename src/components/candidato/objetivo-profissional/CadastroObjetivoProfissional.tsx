import { IObjetivoProfissional } from '@/interfaces/objetivoProfissional';
import InputCargo from '@/components/atoms/inputs/InputCargo';
import InputSalario from '@/components/atoms/inputs/InputSalario';
import SelectModeloTrabalho from '@/components/atoms/inputs/SelectModeloTrabalho';
import SelectRegimeContratual from '@/components/atoms/inputs/SelectRegimeContratual';
import SelectJornadaTrabalho from '@/components/atoms/inputs/SelectJornadaTrabalho';

type Props = {
  register: any;
  errors: any;
  data?: IObjetivoProfissional;
};

const CadastroObjetivoProfissional = ({ register, errors, data }: Props) => {
  return (
    <>
      <InputCargo register={register} error={errors.cargo?.message} required />
      <InputSalario
        label="Pretensão salarial"
        register={register}
        error={errors.salario?.message}
        required
      />
      <SelectModeloTrabalho
        register={register}
        error={errors.modelo_trabalho?.message}
        required
      />
      <SelectRegimeContratual
        register={register}
        error={errors.regime_contratual?.message}
        required
      />
      <SelectJornadaTrabalho
        register={register}
        error={errors.jornada_trabalho?.message}
        required
      />
    </>
  );
};

export default CadastroObjetivoProfissional;
