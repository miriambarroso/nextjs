import { ReactNode } from 'react';
import { classNames } from '@/utils';
import TextSkeleton from '@/components/skeleton/TextSkeleton';

type Props = {
  kind:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'base'
    | string;
  icon?: ReactNode;
  label: string;
};

const Badge = ({ kind, icon, label }: Props) => {
  return (
    <>
      <div
        className={classNames(
          'badge gap-2',
          kind == 'primary' && 'badge-primary',
          kind == 'secondary' && 'badge-secondary',
          kind == 'success' && 'badge-success',
          kind == 'danger' && 'badge-danger',
          kind == 'warning' && 'badge-warning',
          kind == 'info' && 'badge-info',
          kind == 'base' && 'badge-base',
        )}
      >
        {icon}
        <TextSkeleton className="w-8 h-2 bg-gray-400">{label}</TextSkeleton>
      </div>
    </>
  );
};

export const BadgeGroup = ({
  badges,
  className,
}: {
  badges: Props[];
  className?: string;
}) => {
  return (
    <>
      <div
        className={classNames(
          ' overflow-x overflow-y-hidden no-scrollbar',
          className,
        )}
      >
        <div className="flex w-max gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Badge;
