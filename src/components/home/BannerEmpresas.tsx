import GenericBanner from '@/components/atoms/GenericBanner';

type Props = {};

const BannerEmpresas = ({}: Props) => {
  const listItems = [
    'Oportunidades em destaque',
    'Candidatos em destaque',
    'Empresas em destaque',
  ];
  return (
    <>
      <GenericBanner
        title="Heading"
        subtitle="Para Empresas"
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nunc aliquam massa, nec ultricies nisl nunc vel nisl. Sed euismod, nisl nec ultricies ultricies, nisl nunc aliquam massa, nec ultricies nisl nunc vel nisl.'
        }
        image={{
          src: '/img/empresa.jpg',
          alt: 'Banner Empresas',
        }}
        list={listItems}
        action={{
          label: 'Encontre Candidatos',
          href: '/',
        }}
        layout={'right'}
      />
    </>
  );
};

export default BannerEmpresas;
