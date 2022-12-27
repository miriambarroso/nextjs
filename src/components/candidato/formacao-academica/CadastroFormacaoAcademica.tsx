import InputField from '@/components/atoms/InputField';
import ToggleField from '@/components/atoms/ToggleField';
import SelectField from '@/components/atoms/SelectField';
import { FormacaoNivelChoices } from '@/utils/choices';
import { format } from 'date-fns';

type Props = {
  register: any;
  errors: any;
  watch: any;
};

const CadastroFormacaoAcademica = ({ register, errors, watch }: Props) => {
  const nivelFormacaoChoices = [
    {
      label: 'Selecione o nível de formação',
      value: '',
      selected: true,
      disabled: true,
    },
    ...FormacaoNivelChoices.choices,
  ];

  return (
    <>
      <InputField
        label="Instituição de ensino"
        name="instituicao"
        register={register}
        placeholder="Ex: Instituto Federal de Educação, Ciência e Tecnologia de Goiás"
        options={{
          required: true,
        }}
        error={errors.instituicao?.message}
      />
      <InputField
        label="Curso"
        name="curso"
        register={register}
        options={{
          required: true,
        }}
        placeholder="Ex: Análise e Desenvolvimento de Sistemas"
        error={errors.curso?.message}
      />
      <SelectField
        label="Nível de formação"
        name="nivel"
        register={register}
        placeholder="Ex: Superior"
        options={{
          required: true,
        }}
        choices={nivelFormacaoChoices}
        error={errors.nivel?.message}
      />
      <InputField
        label="Data de início"
        name="data_inicio"
        register={register}
        type="date"
        inputProps={{
          max: format(new Date(), 'yyyy-MM-dd'),
        }}
        options={{
          required: true,
        }}
        placeholder="Ex: 01/01/2020"
        error={errors.data_inicio?.message}
      />

      <InputField
        label="Data de conclusão"
        name="data_conclusao"
        type="date"
        register={register}
        inputProps={{
          disabled: watch('data_atual', false),
          max: format(new Date(), 'yyyy-MM-dd'),
        }}
        options={{
          required: !watch('data_atual', false),
        }}
        placeholder="Ex: 01/01/2024"
        error={errors.data_conclusao?.message}
      />
      <ToggleField
        label={'Estou cursando'}
        name={'data_atual'}
        register={register}
      />
    </>
  );
};

export default CadastroFormacaoAcademica;
