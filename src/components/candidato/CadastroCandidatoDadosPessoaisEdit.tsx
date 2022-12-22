import InputField from '@/components/atoms/InputField';
import { cpfMask, phoneMask } from '@/utils/masks';
import RadioField from '@/components/atoms/RadioField';
import {
  EstadoCivilChoices,
  PossuiDeficienciaChoices,
  SexoChoices,
} from '@/components/candidato/cadastro/CadastroCandidatoDadosPessoais';

type Props = { register: any; errors: any };

const CadastroCandidatoDadosPessoaisEdit = ({ register, errors }: Props) => {
  return (
    <>
      <InputField
        label="Nome Completo"
        name="nome"
        register={register}
        placeholder="Insira seu nome completo"
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
        placeholder="Insira seu CPF"
        error={errors.cpf?.message}
        options={{ required: true, onChange: cpfMask.onChange }}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register}
        placeholder="email@email.com"
        error={errors.email?.message}
        options={{
          required: true,
        }}
      />
      <InputField
        label="Celular"
        name="telefone"
        register={register}
        error={errors.telefone?.message}
        type="phone"
        options={{
          required: true,
          onChange: phoneMask.onChange,
        }}
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

export default CadastroCandidatoDadosPessoaisEdit;
