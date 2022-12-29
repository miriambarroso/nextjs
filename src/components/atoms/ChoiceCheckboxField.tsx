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
  cols?: number;
  mobileCols?: number;
};

const ChoiceCheckboxField = ({
  label,
  name,
  register,
  options,
  choices,
  className,
  error,
  cols = 4,
  mobileCols = 2,
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
        <div
          className={classNames(
            'grid gap-x-8',
            cols == 1 && 'md:grid-cols-1',
            cols == 2 && 'md:grid-cols-2',
            cols == 3 && 'md:grid-cols-3',
            cols == 4 && 'md:grid-cols-4',
            cols == 5 && 'md:grid-cols-5',
            cols == 6 && 'md:grid-cols-6',
            mobileCols == 1 && 'grid-cols-1',
            mobileCols == 2 && 'grid-cols-2',
            mobileCols == 3 && 'grid-cols-3',
            mobileCols == 4 && 'grid-cols-4',
            mobileCols == 5 && 'grid-cols-5',
            mobileCols == 6 && 'grid-cols-6',
          )}
        >
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
