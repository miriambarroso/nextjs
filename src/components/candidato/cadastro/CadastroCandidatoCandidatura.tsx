import InputField from '@/components/atoms/InputField';
import { currencyMask } from '@/utils/masks';

type Props = { register: any; errors: any };

const CadastroCandidatoCandidatura = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Cargo Desejado"
        name="cargo"
        register={register}
        placeholder="Ex: Analista de Sistemas"
        error={errors.cargo?.message}
      />
      <InputField
        label="Pretensão Salarial"
        name="salario"
        placeholder="Ex: 2.000,00"
        register={register}
        options={{
          onChange: currencyMask.onChange,
        }}
        error={errors.salario?.message}
      />
      <InputField
        label="Modelo de Trabalho"
        name="modelo_trabalho"
        placeholder="Ex: Remoto"
        register={register}
        error={errors.modelo_trabalho?.message}
      />
      <InputField
        label="Regime de Contratação"
        name="regime_contratual"
        placeholder="Ex: CLT"
        register={register}
        error={errors.regime_contratual?.message}
      />
      <InputField
        label="Jornada de Trabalho"
        name="jornada_trabalho"
        placeholder="Ex: 40 horas semanais"
        register={register}
        error={errors.jornada_trabalho?.message}
      />
    </>
  );
};

export default CadastroCandidatoCandidatura;
