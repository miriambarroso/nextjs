import { classNames } from '@/utils';
import { BiHealth } from 'react-icons/bi';

type ChoiceProp = {
  label: string;
  value: string;
  checked?: boolean;
};

type Props = {
  label: string;
  name: string;
  register: any;
  choices: ChoiceProp[];
  checked?: string;
  options?: any;
  className?: string;
  error?: any;
};

const ChoiceCheckboxField = ({
  label,
  name,
  register,
  options,
  choices,
  className,
  error,
}: Props) => {
  return (
    <>
      <div className={classNames(className)}>
        <div className="label">
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
        </div>
        <div className="grid grid-cols-4 gap-x-8">
          {choices.map((choice) => (
            <div key={`${name}-${choice.value}`} className="flex">
              <div className="form-control">
                <label className="label cursor-pointer  space-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    value={choice.value}
                    {...register(name, options)}
                  />
                  <span className="label-text">{choice.label}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <label className={classNames(!error && 'hidden', 'label')}>
          <span className="label-text-alt text-error">{error}</span>
        </label>
      </div>
    </>
  );
};

export default ChoiceCheckboxField;
