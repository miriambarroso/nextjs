import Link from 'next/link';

type Props = {};

const TopicosSection = ({}: Props) => {
  const cards = [
    {
      title: 'Recrutamento & Seleção',
      description:
        'Contrate com agilidade e otimize a gestão de seus processos seletivos. Desde a atração de talentos até a seleção final, nossa plataforma centraliza todo o recrutamento em um único lugar, com análise de dados e relatórios relevantes para a sua tomada de decisão certa para cada vaga',
      url: {
        label: 'Link 1',
        href: 'https://google.com',
        target: '_blank',
      },
    },
    {
      title: 'Card 1',
      description: 'Description 1',
      url: {
        label: 'Link 1',
        href: 'https://google.com',
        target: '_blank',
      },
    },
    {
      title: 'Card 1',
      description: 'Description 1',
      url: {
        label: 'Link 1',
        href: 'https://google.com',
        target: '_blank',
      },
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x divide-base-200">
        {cards.map((card, index) => (
          <div key={index} className="card rounded-none ">
            <div className="card-body py-8 px-0 lg:px-8">
              <h2 className="card-title justify-center lg:justify-start">
                {card.title}
              </h2>
              <p>{card.description}</p>
              <div className="card-actions justify-center lg:justify-start">
                <Link
                  href={card.url?.href}
                  className="btn btn-neutral btn-wide lg:w-max lg:btn-medium"
                >
                  {card.url?.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopicosSection;
