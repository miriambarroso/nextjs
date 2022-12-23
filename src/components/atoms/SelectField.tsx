import { classNames } from '@/utils';
import { BiHealth } from 'react-icons/bi';

export type ChoiceProp = {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
};

type Props = {
  label: string;
  name: string;
  register: any;
  placeholder?: string;
  choices: ChoiceProp[];
  options?: any;
  type?: string;
  className?: string;
  error?: any;
};

const SelectField = ({
  label,
  name,
  register,
  choices,
  options,
  className,
  error,
}: Props) => {
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
      <select
        defaultValue={choices.find((i) => i.selected)?.value}
        {...register(name, options)}
        className="select select-bordered"
      >
        {choices.map((choice) => (
          <option
            key={`${name}-${choice.value}`}
            disabled={choice.disabled}
            value={choice.value}
          >
            {choice.label}
          </option>
        ))}
      </select>
      <label className={classNames(!error && 'hidden', 'label')}>
        <span className="label-text-alt text-error">{error}</span>
      </label>
    </div>
  );
};

export default SelectField;
