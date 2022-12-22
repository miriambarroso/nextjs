import { classNames } from '@/utils';

type Props = {
  label: string;
  name: string;
  register: any;
  className?: string;
};

const ToggleField = ({ label, name, register, className }: Props) => {
  return (
    <div className={classNames('form-control', className)}>
      <label className="label cursor-pointer space-x-2 justify-start">
        <input
          type="checkbox"
          className="toggle toggle-sm toggle-primary"
          {...register(name)}
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default ToggleField;
