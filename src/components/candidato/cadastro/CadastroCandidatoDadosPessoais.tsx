import InputField from '@/components/atoms/InputField';
import { cpfMask } from '@/utils/masks';
import RadioField from '@/components/atoms/RadioField';

type Props = { register: any; errors: any };

export const SexoChoices = [
  { label: 'Feminino', value: '1', checked: true },
  { label: 'Masculino', value: '2' },
  { label: 'Não Informar', value: '3' },
];

export const EstadoCivilChoices = [
  { label: 'Solteiro(a)', value: '1', checked: true },
  { label: 'Casado(a)', value: '2' },
  { label: 'Separado(a)', value: '3' },
  { label: 'Divorciado(a)', value: '4' },
  { label: 'Viúvo(a)', value: '5' },
  { label: 'União Estável', value: '6' },
  { label: 'Outro', value: '7' },
];

export const PossuiDeficienciaChoices = [
  { label: 'Não', value: 'false', checked: true },
  { label: 'Sim', value: 'true' },
];

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
      <RadioField
        label="Genêro"
        name="sexo"
        register={register}
        error={errors.sexo?.message}
        choices={SexoChoices}
        options={{
          required: true,
        }}
      />
      <RadioField
        label="Estado Civil"
        name="estado_civil"
        error={errors.estado_civil?.message}
        register={register}
        choices={EstadoCivilChoices}
        options={{
          required: true,
        }}
      />
      <RadioField
        label="Possui deficiência (PcD)?"
        name="possui_deficiencia"
        error={errors.possui_deficiencia?.message}
        register={register}
        choices={PossuiDeficienciaChoices}
      />
    </>
  );
};

export default CadastroCandidatoDadosPessoais;
