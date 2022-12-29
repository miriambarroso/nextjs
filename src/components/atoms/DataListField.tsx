import { classNames, generateID } from '@/utils';
import { BiHealth } from 'react-icons/bi';
import { IChoice } from '@/utils/choices';

type Props = {
  label: string;
  name: string;
  register: any;
  error?: any;
  className?: string;
  type?: string;
  options?: any;
  placeholder?: string;
  inputProps?: any;
  choices: IChoice[];
};

const DataListField = ({
  label,
  name,
  register,
  placeholder,
  options,
  type = 'text',
  className,
  error,
  inputProps,
  choices,
}: Props) => {
  const id = `id_${generateID()}`;

  return (
    <div className={classNames('form-control', className)}>
      <label className="label">
        <span className="label-text">
          {label}{' '}
          {options?.required && (
            <BiHealth
              className={classNames(
                error ? 'text-error' : 'text-base-200',
                ' inline-block text-xs',
              )}
            />
          )}
        </span>
      </label>
      <input
        list={id}
        {...register(name, options)}
        type={type}
        {...inputProps}
        placeholder={placeholder}
        className={classNames('input', error && 'input-error')}
      />
      <datalist id={id}>
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value} />
        ))}
      </datalist>
      <label className={classNames(!error && 'hidden', 'label')}>
        <span className="label-text-alt text-error">{error}</span>
      </label>
    </div>
  );
};

export default DataListField;
