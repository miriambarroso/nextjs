import GenericBanner from '@/components/atoms/GenericBanner';

type Props = {};

const BannerCandidatos = ({}: Props) => {
  const listItems = [
    'Oportunidades em destaque',
    'Candidatos em destaque',
    'Empresas em destaque',
  ];
  return (
    <>
      <GenericBanner
        title="Heading"
        subtitle="Para Candidatos"
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nunc aliquam massa, nec ultricies nisl nunc vel nisl. Sed euismod, nisl nec ultricies ultricies, nisl nunc aliquam massa, nec ultricies nisl nunc vel nisl.'
        }
        image={{
          src: '/img/carteira_trabalho.jpeg',
          alt: 'Banner Candidatos',
        }}
        list={listItems}
        action={{
          label: 'Encontre Oportunidades',
          href: '/',
        }}
        layout={'left'}
      />
    </>
  );
};

export default BannerCandidatos;
