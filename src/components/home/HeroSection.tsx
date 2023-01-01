import Link from 'next/link';
import Image from 'next/image';

type Props = {};

const HeroSection = ({}: Props) => {
  return (
    <>
      <div className="hero grid-cols-1 lg:grid-cols-2 py-16 lg:py-48">
        {/*<div className="hero-overlay bg-opacity-60"></div>*/}
        <div className="hero-content max-w-2xl text-left text-neutral">
          <div className="w-full">
            <h1 className="mb-5 text-3xl lg:text-5xl font-bold font-nato-sans uppercase">
              Inteligência Artificial conectando a cidade de Anápolis com
              empregados e empregadores
            </h1>
            {/*<p className="mb-5">*/}
            {/*  Provident cupiditate voluptatem et in. Quaerat fugiat ut*/}
            {/*  assumenda excepturi exercitationem quasi. In deleniti eaque aut*/}
            {/*  repudiandae et a id nisi.*/}
            {/*</p>*/}
            <Link
              href={'/candidato/cadastrar'}
              className="btn btn-primary text-white"
            >
              Comece agora
            </Link>
          </div>
        </div>
        <div className="hero-content hidden lg:block col-start-2 max-w-2xl text-left text-neutral">
          <div className="w-full relative">
            <div className="absolute right-[-3rem] bottom-[-3rem] w-64 aspect-square">
              <Image
                src={'/img/empresa.jpg'}
                alt={'Hero Empresa'}
                fill
                className="rounded-full"
                loading={'eager'}
              />
            </div>
            <div className="absolute top-[-3rem] left-[-3rem] w-64 aspect-square">
              <Image
                src={'/img/pessoa_carteira_trabalho.jpeg'}
                alt={'Pessoa com cateira de trabalho'}
                fill
                className="rounded-full"
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
