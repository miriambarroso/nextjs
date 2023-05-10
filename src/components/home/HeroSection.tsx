import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth';

type Props = {};

const HeroSection = ({}: Props) => {
  const [isGuest] = useAuthStore((state) => [state.isGuest]);

  return (
    <>
      <div className="hero grid-cols-1 lg:grid-cols-2 py-16 lg:py-48">
        {/*<div className="hero-overlay bg-opacity-60"></div>*/}
        <div className="hero-content max-w-2xl text-left text-neutral">
          <div className="w-full space-y-5">
            <h1 className="text-2xl lg:text-4xl font-bold font-nato-sans uppercase">
              Vagas Anápolis - Recrutamento com Inteligência Artificial a
              serviço dos Anapolinos
            </h1>
            <div>
              <p>
                Somos uma política pública de fomento a geração de emprego e
                renda.
              </p>
              <p>
                Aproximamos trabalhadores e empresas por meio da inovação e
                tecnologia.
              </p>
              <p>Seja bem vindo!</p>
            </div>

            {isGuest() ? (
              <Link
                href={'/candidato/cadastrar'}
                className="btn btn-primary text-white"
              >
                Comece agora
              </Link>
            ) : null}
          </div>
        </div>
        <div className="hero-content hidden lg:block col-start-2 max-w-2xl text-left text-neutral">
          <div className="w-full relative">
            <div className="absolute right-[-3rem] bottom-[-3rem] w-64 aspect-square">
              <Image
                src={'/img/c938f279-e506-47b6-a6c5-f81384f06bd9.jpeg'}
                alt={'Hero Empresa'}
                fill
                className="rounded-full object-cover"
                loading={'eager'}
              />
            </div>
            <div className="absolute top-[-3rem] left-[-3rem] w-64 aspect-square">
              <Image
                src={'/img/pessoa_carteira_trabalho.jpeg'}
                alt={'Pessoa com cateira de trabalho'}
                fill
                className="rounded-full object-cover"
                loading={'eager'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
