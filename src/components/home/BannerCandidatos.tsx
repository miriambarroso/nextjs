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
        // title="Heading"
        subtitle="Para Candidatos"
        description={
          'Números do Caged mostram que a Anápolis é o município goiano que mais gera empregos. Em 2022 foram cerca de 7 mil novas vagas. A atividade econômica de Prestação de Serviços foi a que mais se destacou, seguida pela Indústria, Construção, Comércio e Agropecuária. Cadastre seu currículo e seja o próximo (a) a ser contratado.'
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
