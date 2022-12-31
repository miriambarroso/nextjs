import Link from 'next/link';
import { ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  onClick?: () => void;
  href?: string;
  action?: () => Promise<void> | void;
  className?: string;
  children: ReactNode;
};

const DrawerLink = ({ onClick, href, action, className, children }: Props) => {
  return (
    <>
      {href && (
        <Link
          onClick={onClick}
          href={href}
          className={classNames(
            'flex uppercase w-full justify-center items-center relative border-b w-10/12 mx-auto border-base-100/30 px-4 py-4 text-center font-noto-sans text-white',
            className,
          )}
        >
          {children}
        </Link>
      )}
      {action && (
        <button
          onClick={() => {
            action();
            onClick();
          }}
          className={classNames(
            'flex uppercase w-full justify-center items-center relative border-b w-10/12 mx-auto border-base-100/30 px-4 py-4 text-center font-noto-sans text-white',
            className,
          )}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default DrawerLink;
