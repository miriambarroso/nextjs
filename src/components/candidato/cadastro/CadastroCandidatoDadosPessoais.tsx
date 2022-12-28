import ChoiceRadioField from '@/components/atoms/ChoiceRadioField';
import {
  EstadoCivilChoices,
  PossuiDeficienciaChoices,
  SexoChoices,
  TipoDeficienciaChoices,
} from '@/utils/choices';
import { subYears } from 'date-fns';
import InputNome from '@/components/atoms/inputs/InputNome';
import InputDate from '@/components/atoms/inputs/InputDate';
import InputCPF from '@/components/atoms/inputs/InputCPF';
import InputEmail from '@/components/atoms/inputs/InputEmail';
import InputTelefone from '@/components/atoms/inputs/InputTelefone';

type Props = { register: any; errors: any; watch: any; editMode?: boolean };

const CadastroCandidatoDadosPessoais = ({
  register,
  errors,
  watch,
  editMode,
}: Props) => {
  return (
    <>
      <InputNome register={register} error={errors.nome?.message} required />
      <InputDate
        label="Data de Nascimento"
        name="data_nascimento"
        register={register}
        error={errors.data_nascimento?.message}
        required
        maxDate={subYears(new Date(), 14)}
      />
      <InputCPF register={register} error={errors.cpf?.message} required />
      {editMode && (
        <>
          <InputEmail
            register={register}
            error={errors.email?.message}
            required
          />
          <InputTelefone
            label="Celular"
            register={register}
            error={errors.telefone?.message}
            required
          />
        </>
      )}

      <ChoiceRadioField
        label="Genêro"
        name="sexo"
        register={register}
        error={errors.sexo?.message}
        choices={SexoChoices.choices}
        options={{
          required: true,
        }}
      />
      <ChoiceRadioField
        label="Estado Civil"
        name="estado_civil"
        error={errors.estado_civil?.message}
        register={register}
        choices={EstadoCivilChoices.choices}
        options={{
          required: true,
        }}
      />
      <ChoiceRadioField
        label="Possui deficiência (PcD)?"
        name="possui_deficiencia"
        error={errors.possui_deficiencia?.message}
        register={register}
        choices={PossuiDeficienciaChoices.choices}
      />
      {watch('possui_deficiencia', 'false') == 'true' && (
        <ChoiceRadioField
          label="Tipo de deficiência"
          name="tipo_deficiencia"
          error={errors.tipo_deficiencia?.message}
          options={{
            required: true,
          }}
          register={register}
          choices={TipoDeficienciaChoices.choices}
        />
      )}
    </>
  );
};

export default CadastroCandidatoDadosPessoais;
