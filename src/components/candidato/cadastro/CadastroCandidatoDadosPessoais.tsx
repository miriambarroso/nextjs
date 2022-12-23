import InputField from '@/components/atoms/InputField';
import { cpfMask } from '@/utils/masks';
import ChoiceRadioField from '@/components/atoms/ChoiceRadioField';
import {
  EstadoCivilChoices,
  PossuiDeficienciaChoices,
  SexoChoices,
  TipoDeficienciaChoices,
} from '@/utils/choices';
import ChoiceCheckboxField from '@/components/atoms/ChoiceCheckboxField';

type Props = { register: any; errors: any };

const CadastroCandidatoDadosPessoais = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Nome Completo"
        name="nome"
        register={register}
        placeholder="Ex: João da Silva"
        error={errors.nome?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Data de Nascimento"
        name="data_nascimento"
        register={register}
        error={errors.data_nascimento?.message}
        type="date"
        options={{
          required: true,
        }}
      />

      <InputField
        label="CPF"
        name="cpf"
        register={register}
        placeholder="Ex: 000.000.000-00"
        error={errors.cpf?.message}
        options={{ required: true, onChange: cpfMask.onChange }}
      />
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
      <ChoiceCheckboxField
        label="Tipo de deficiência"
        name="tipo_deficiencia"
        error={errors.tipo_deficiencia?.message}
        register={register}
        choices={TipoDeficienciaChoices.choices}
      />
    </>
  );
};

export default CadastroCandidatoDadosPessoais;
