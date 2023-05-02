import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { classNames } from '@/utils';

type Props = {};

const TopicosSection = ({}: Props) => {
  const user = useAuthStore((state) => state.user);
  const [isGuest, isCandidato, isEmpregador] = useAuthStore((state) => [
    state.isGuest,
    state.isCandidato,
    state.isEmpregador,
  ]);

  const cards = [
    {
      title: 'Recrutamento & Seleção',
      description:
        'Contrate com agilidade e otimize a gestão de seus processos seletivos. Desde a atração de talentos até a seleção final, nossa plataforma centraliza todo o recrutamento em um único lugar, com análise de dados e relatórios relevantes para a sua tomada de decisão certa para cada vaga',
      disabled: !isGuest(),
      url: {
        label: 'Cadastrar Vaga',
        href: () =>
          isGuest()
            ? '/empresa/cadastrar'
            : isEmpregador()
            ? '/empresa/vaga/cadastrar'
            : '',
        // target: '_blank',
      },
    },
    {
      title: 'Cadastre seu currículo',
      description:
        'Você que está a procura de emprego ou uma melhor recolocação no mercado de trabalho, cadastre seus dados. É rápido, fácil e simples. Os recrutadores vão analisar seus dados e entrar em contato com você.',
      disabled: !isGuest(),
      url: {
        label: 'Cadastrar currículo',
        href: () => (isGuest() ? '/candidato/cadastrar' : ''),
        // target: '_blank',
      },
    },
    // {
    //   title: 'Nossos resultados',
    //   description:
    //     'Acesse os indicadores, que comprovam a efetividade do nosso projeto. Políticas públicas que fomentam a economia e o desenvolvimento de Anápolis, por meio da inteligência artificial que promove conexões.',
    //   url: {
    //     label: 'Acessar agora',
    //     href: '',
    //     // target: '_blank',
    //   },
    // },
  ];

  const cols = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
  };

  return (
    <>
      {cards.filter((card) => !card.disabled).length > 0 ? (
        <div
          className={classNames(
            'grid grid-cols-1',
            cols[cards.filter((card) => !card.disabled).length],
            'lg:divide-x divide-base-200',
          )}
        >
          {cards
            .filter((card) => !card.disabled)
            .map((card, index) => (
              <div key={index} className="card rounded-none ">
                <div className="card-body py-8 px-0 lg:px-8">
                  <h2 className="card-title justify-center lg:justify-start">
                    {card.title}
                  </h2>
                  <p>{card.description}</p>
                  <div className="card-actions justify-center lg:justify-start">
                    <Link
                      href={
                        typeof card.url?.href == 'function'
                          ? card.url?.href()
                          : card.url?.href
                      }
                      className="btn btn-neutral btn-wide lg:w-max lg:btn-medium"
                    >
                      {card.url?.label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default TopicosSection;
