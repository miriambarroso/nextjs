import ChoiceCheckboxField from '@/components/atoms/ChoiceCheckboxField';
import { IChoice } from '@/utils/choices';
import { useEffect, useState } from 'react';
import BeneficioService from '@/services/BeneficioService';
import { toastError } from '@/utils/toasts';
import { isEmpty } from 'lodash';

type Props = {
  register;
  error;
  required?: boolean;
  label?: string;
  name?: string;
  beneficios?: IChoice[];
};

const ChoiceCheckboxBeneficio = ({
  register,
  name = 'beneficios',
  label = 'Benefícios',
  error,
  required,
  beneficios,
}: Props) => {
  const [items, setItems] = useState<IChoice[]>([]);

  const fetchBeneficios = async () => {
    try {
      const data = await BeneficioService.getAll();
      setItems(data.map((i) => ({ label: i.nome, value: i.id })));
    } catch (e) {
      toastError('Erro ao buscar benefícios');
    }
  };

  useEffect(() => {
    if (isEmpty(beneficios)) {
      fetchBeneficios();
    } else {
      setItems(beneficios);
    }
  }, [beneficios]);

  return (
    <>
      <ChoiceCheckboxField
        label={label}
        name={name}
        register={register}
        choices={items}
        error={error}
        options={{
          required: required,
        }}
        cols={2}
        mobileCols={1}
      />
    </>
  );
};

export default ChoiceCheckboxBeneficio;
