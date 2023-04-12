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
        // title="Heading"
        subtitle="Para Empresas"
        description={
          'As políticas de fomento à produção industrial, ao desenvolvimento econômico, a criação de novas empresas e empreendimentos têm levado o Estado de Goiás a ser referência nacional. O município de Anápolis é um dos mais importantes em decorrência da sua localização estratégica, potencialidades e vocações. As empresas locais estão sempre contratando novos colaboradores! Cadastre suas vagas aqui e selecione novos talentos.'
        }
        image={{
          src: '/img/empresa.jpg',
          alt: 'Banner Empresas',
        }}
        list={listItems}
        action={{
          label: 'Encontre Candidatos',
          href: '/candidatos',
        }}
        layout={'right'}
      />
    </>
  );
};

export default BannerEmpresas;
