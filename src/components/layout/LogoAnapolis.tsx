import Image from 'next/image';
import { classNames } from '@/utils';
import Link from 'next/link';

type Props = { className?: string };

const LogoAnapolis = ({ className }: Props) => {
  return (
    <Link
      href="https://www.anapolis.go.gov.br/"
      target={'_blank'}
      className={classNames('relative', className)}
    >
      <Image
        src={'/img/logo_anapolis.png'}
        alt={'Prefeitura de Anápolis'}
        className="object-contain"
        fill
      />
    </Link>
  );
};

export default LogoAnapolis;
