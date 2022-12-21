import { classNames } from '@/utils';

type ChoiceProp = {
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
        <span className="label-text">{label}</span>
      </label>
      <select {...register(name, options)} className="select select-bordered">
        {choices.map((choice) => (
          <option
            key={`${name}-${choice.value}`}
            disabled={choice.disabled}
            selected={choice.selected}
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
