import Image from 'next/image';
import Link from 'next/link';

type Props = {
  layout: 'right' | 'left';
  title: string;
  image: {
    src: string;
    alt: string;
  };
  subtitle: string;
  description: string;
  list: string[];
  action: {
    href: string;
    label: string;
  };
};

const GenericBanner = ({
  layout,
  title,
  image,
  subtitle,
  description,
  list,
  action,
}: Props) => {
  return (
    <>
      <div className="bg-primary w-full grid grid-cols-1 lg:grid-cols-2 text-white rounded">
        {layout === 'left' ? (
          <div className="relative h-64 lg:h-full">
            <Image
              src={image.src}
              alt={image.alt}
              className={'rounded-t lg:rounded-l object-cover'}
              fill
            />
          </div>
        ) : null}

        <div className="p-8">
          <div className="space-y-4 mb-8">
            <h2>{subtitle}</h2>
            <h3 className="text-2xl font-semibold font-noto-sans">{title}</h3>
            <h4 className="text-2xl">{description}</h4>
          </div>

          <div className="mt-auto space-y-4">
            <hr className="w-full border-white" />
            <ul className="list space-y-2">
              {list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <Link
              href={action?.href}
              className="btn btn-sm border-none bg-white hover:bg-base-100 text-primary"
            >
              {action?.label}
            </Link>
          </div>
        </div>

        {layout === 'right' ? (
          <div className="relative h-64 lg:h-full">
            <Image
              src={image.src}
              alt={image.alt}
              className={'rounded-b lg:rounded-r object-cover'}
              fill
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GenericBanner;
