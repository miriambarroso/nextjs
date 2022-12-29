import TextAreaField from '@/components/atoms/TextAreaField';
import ToggleField from '@/components/atoms/ToggleField';
import SelectRegimeContratual from '@/components/atoms/inputs/SelectRegimeContratual';
import InputCargo from '@/components/atoms/inputs/InputCargo';

type Props = {
  register: any;
  errors: any;
};

const CadastroVagaSobre = ({ register, errors }: Props) => {
  return (
    <>
      <SelectRegimeContratual
        register={register}
        error={errors.regime_contratual?.message}
        required
      />
      <InputCargo register={register} error={errors.cargo?.message} required />
      <TextAreaField
        label="Atividades desempenhadas"
        name="atividades"
        placeholder={'Descrição das atividades envolvidas no cargo'}
        register={register}
        error={errors.atividades?.message}
        options={{
          required: true,
        }}
      />
      <TextAreaField
        label="Requisitos necessários ou desejáveis"
        name="requisitos"
        placeholder={
          'Listagem de requisitos necessários ou desejáveis para o cargo'
        }
        register={register}
        error={errors.requisitos?.message}
        options={{
          required: true,
        }}
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
