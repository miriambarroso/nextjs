import LogoEmprega from '@/components/layout/LogoEmprega';
import LogoAnapolis from '@/components/layout/LogoAnapolis';
import LogoIFG from '@/components/layout/LogoIFG';

type Props = {};

const Footer = ({}: Props) => {
  const footerLinks = {
    Institucional: [
      { label: 'Sobre', href: '/sobre' },
      { label: 'Política de Cookies', href: '#' },
    ],
    Empresas: [
      { label: 'Como funciona', href: '#' },
      { label: 'Anunciar Vagas', href: '#' },
      { label: 'Buscar Candidatos', href: '#' },
      { label: 'Aviso Legal', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
    ],
    Candidatos: [
      { label: 'Como funciona', href: '#' },
      { label: 'Buscar Vagas', href: '#' },
      { label: 'Aviso Legal', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
    ],
  };

  return (
    <footer className="bg-neutral">
      <div className="flex justify-between p-10 container text-base-100 flex-wrap lg:flex-nowrap gap-8">
        <div className="w-full">
          <LogoEmprega className="h-16 mb-4" />
          <LogoAnapolis className="h-20 mb-4" />
          <LogoIFG className="h-16" />
        </div>
        <div className="footer">
          {Object.keys(footerLinks).map((key) => (
            <div key={key}>
              <span className="footer-title text-primary opacity-100">
                {key}
              </span>
              {footerLinks[key].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link link-hover"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
