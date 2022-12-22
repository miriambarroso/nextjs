import InputField from '@/components/atoms/InputField';
import TextAreaField from '@/components/atoms/TextAreaField';
import ToggleField from '@/components/atoms/ToggleField';

type Props = {
  register: any;
  errors: any;
};

const CadastroVagaSobre = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label={'Regime de Contratação'}
        name={'regime_contratual'}
        register={register}
        placeholder={'Ex: CLT'}
        error={errors.regime_contratual?.message}
      />
      <InputField
        label="Cargo"
        name="cargo"
        placeholder={'Ex: Desenvolvedor'}
        register={register}
        error={errors.cargo?.message}
      />
      <TextAreaField
        label="Atividades desempenhadas"
        name="atividades"
        placeholder={'Descrição das atividades envolvidas no cargo'}
        register={register}
        error={errors.atividades?.message}
      />
      <TextAreaField
        label="Requisitos necessários ou desejáveis"
        name="requisitos"
        placeholder={
          'Listagem de requisitos necessários ou desejáveis para o cargo'
        }
        register={register}
        error={errors.requisitos?.message}
      />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Vaga exclusiva para PcD?</span>
        </label>
        <ToggleField
          label={'Vaga exclusiva'}
          name={'pessoa_deficiencia'}
          register={register}
        />
      </div>
    </>
  );
};

export default CadastroVagaSobre;
