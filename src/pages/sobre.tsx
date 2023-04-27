import Image from 'next/image';

type Props = {};

const Page = ({}: Props) => {
  const responsaveis = [
    {
      nome: 'Adriano César de Melo Camargo',
      url: 'https://github.com/znehAC',
    },
    {
      nome: 'Bruno de Araújo Alves',
      url: 'https://baraus.dev',
    },
    {
      nome: 'Daniel Xavier de Sousa (Professor Orientador)',
      url: 'http://lattes.cnpq.br/4603724338719739',
    },
  ];

  return (
    <>
      <div className="container max-w-3xl mx-auto space-y-16 py-8 prose">
        <div>
          <p>
            A <strong>Plataforma Vagas Anápolis</strong> é resultado de uma
            parceria entre Prefeitura de Anápolis e Instituto Federal de Goiás,
            Campus Anápolis. A plataforma apresenta um ambiente Web de fácil
            acesso para candidatos e empresas, neste caso para cadastro de
            currículos e vagas de emprego. A partir desses dados, a plataforma
            utiliza-se de um modelo de Inteligência Artificial que recomenda
            vagas personalizadas para quem procura emprego, e seleção de
            candidatos ainda mais alinhados às demandas das empresas.
          </p>
          <Image
            src="img/sobre.png"
            alt="Imagem ilustrativa"
            width={1047}
            height={622}
          />
        </div>
        <div>
          <h2>Objetivos Alcançados</h2>
          <p>
            O objetivo principal da plataforma é simplificar a busca por
            empregos e facilitar o processo de seleção de candidatos pelas
            empresas. A plataforma foi construída com uma interface amigável e
            intuitiva, o que permite aos usuários navegarem com facilidade,
            fazendo buscas por vagas em diversas áreas. A plataforma alcança
            hoje os seguintes objetivos:
          </p>
          <ul>
            <li>
              Automatização no atendimento de pessoas que procuram emprego,
              fornecendo um serviço de recomendação de vagas especializado para
              quem procura ou oferta de empregos;
            </li>
            <li>
              Diminuir os custos e esforços de empresas que fazem seleção dos
              candidatos às vagas;
            </li>
            <li>
              Maior acessibilidade na prestação do serviços da prefeitura,
              permitindo atendimento 24 horas, 7 dias por semana;
            </li>
            <li>
              Construção de uma grande base de dados de candidatos e vagas de
              emprego, permitindo ampliar a gerência da máquina pública na área
              de Empregabilidade e Trabalho.
            </li>
          </ul>
        </div>
        <div>
          <h2>Metodologia Aplicada</h2>
          <p>
            O desenvolvimento da plataforma envolveu uma metodologia bem
            definida, dividida em três eixos principais.{' '}
          </p>
          <ol>
            <li>
              No primeiro eixo aplicamos técnicas de Processamento de Linguagem
              Natural, variando as formas de aplicação de técnicas de
              representação de dados descritas na literatura, permitindo o
              processamento dos currículos dos usuários e vagas das empresas.
              Aqui avaliamos as estratégias de Embeddings Bag of Words e baseado
              em contexto.
            </li>
            <li>
              No segundo eixo utilizamos de técnicas Sistemas de Recomendação,
              gerando sugestões personalizadas para cada usuário, seja empresa
              ou candidato. Neste caso consideramos a estratégia de Recomendação
              Baseada em Conteúdo.
            </li>
            <li>
              Por fim, o terceiro eixo concentrou-se no desenvolvimento do
              sistema WEB, integrando o Sistema de Recomendação com uma
              interface Web de fácil acesso às recomendações. Algumas das
              tecnologias utilizadas foram:
              <ul>
                <li>Django</li>
                <li>PostgreSQL</li>
                <li>NextJs</li>
              </ul>
            </li>
          </ol>
          <p>
            Em resumo, a <strong>Plataforma Vagas Anápolis</strong> é uma
            inovação tecnológica que visa contribuir para o posicionamento da
            Cidade de Anápolis dentro do conceito Cidades 4.0, em especial no
            campo da <strong>empregabilidade e trabalho</strong>.
          </p>
        </div>
        <div>
          <h2>Conclusão</h2>
          <p>
            Em suma, a <strong>Plataforma Vagas Anápolis</strong> é um forte
            exemplo que com uso de tecnologias na área de Inteligência
            Artificial, é possível reduzir custos e aumentar a acessibilidade de
            serviços públicos à comunidade geral. No nosso caso, descrevendo uma
            ferramenta eficiente e eficaz para empresas e usuários que buscam
            encontrar candidatos para suas empresas ou vagas de emprego.
          </p>
        </div>
        <div>
          <h2>Equipe Responsável</h2>
          <p>
            A equipe responsável pelo desenvolvimento da plataforma é formada
            pelo professor orientador e alunos do Instituto Federal de Goiás,
            Campus Anápolis, composta por:
          </p>
          <ul>
            {responsaveis.map((responsavel) => (
              <li key={responsavel.nome}>
                <a href={responsavel.url} target="_blank" rel="noreferrer">
                  {responsavel.nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

Page.overrideLayout = 'bg-white';
export default Page;
