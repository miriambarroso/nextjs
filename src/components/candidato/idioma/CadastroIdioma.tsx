import SelectField from '@/components/atoms/SelectField';
import { IdiomaChoices, IdiomaNivelChoices } from '@/utils/choices';

type Props = {
  register: any;
  errors: any;
};

const CadastroIdioma = ({ register, errors }: Props) => {
  const idiomaNivelChoices = [
    {
      label: 'Selecione o nível',
      value: '',
      selected: true,
      disabled: true,
    },
    ...IdiomaNivelChoices.choices,
  ];

  const idiomaChoices = [
    {
      label: 'Selecione o idioma',
      value: '',
      selected: true,
      disabled: true,
    },
    ...IdiomaChoices.choices,
  ];

  return (
    <>
      <SelectField
        label="Idioma"
        name={'nome'}
        register={register}
        error={errors.nome?.message}
        options={{
          required: true,
        }}
        choices={idiomaChoices}
      />
      <SelectField
        label="Nível"
        name={'nivel'}
        choices={idiomaNivelChoices}
        register={register}
        error={errors.nivel?.message}
        options={{
          required: true,
        }}
      />
    </>
  );
};

export default CadastroIdioma;
