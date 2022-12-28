import { ReactNode } from 'react';
import Link from 'next/link';
import { classNames } from '@/utils';

type Props = {
  title: string;
  button: { label: string; href: string };
  cardClassName?: string;
  btnClassName?: string;
  children: ReactNode;
};

const CardPerfil = ({
  title,
  button,
  children,
  cardClassName,
  btnClassName,
}: Props) => {
  return (
    <div
      className={classNames(
        'rounded p-4 space-y-4',
        cardClassName ?? 'bg-white text-secondary',
      )}
    >
      <p className="font-noto-sans font-semibold">{title}</p>
      {children}
      <div>
        <Link
          href={button.href}
          className={classNames(
            'btn btn-sm  btn-outline',
            btnClassName ?? 'btn-neutral',
          )}
        >
          {button.label}
        </Link>
      </div>
    </div>
  );
};

export default CardPerfil;
