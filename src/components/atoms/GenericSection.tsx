import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  title: string;
  action?: {
    href: string;
    label: string;
  };
  children: ReactNode;
};

const GenericSection = ({ title, action, children }: Props) => {
  return (
    <>
      <div>
        <div className="flex mb-8">
          <h2 className="text-2xl font-semibold font-noto-sans">{title}</h2>
          {action && (
            <Link
              href={action?.href}
              className="link link-neutral link-hover ml-auto"
            >
              {action?.label}
            </Link>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default GenericSection;
