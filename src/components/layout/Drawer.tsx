import { ReactNode, useState } from 'react';
import { classNames } from '@/utils';
import { BiX } from 'react-icons/bi';
import LogoEmprega from '@/components/layout/LogoEmprega';
import Accordion from '@/components/atoms/Accordion';

type Props = { children: ReactNode; className?: string };

const Drawer = ({ children, className }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const accordionEmpresas = [
    [
      { name: 'Cadastrar', href: '/empresa/cadastro' },
      { name: 'Vaga', href: '/vaga/cadastro' },
    ],
  ];

  const accordionCandidatos = [
    [
      { name: 'Cadastrar', href: '/candidato/cadastro' },
      {
        name: 'Objetivo Profissional',
        href: '/candidato/objetivo-profissional',
      },
      { name: 'Formação Acadêmica', href: '/candidato/formacao-academica' },
      {
        name: 'Experiência Profissional',
        href: '/candidato/experiencia-profissional',
      },
      {
        name: 'Curso e Especialização',
        href: '/candidato/curso-especializacao',
      },
      { name: 'Idioma', href: '/candidato/idioma' },
    ],
  ];

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <div className={classNames('drawer drawer-end', className)}>
      <input
        id="drawer-navbar"
        type="checkbox"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side lg:hidden">
        <span className="drawer-overlay"></span>

        <div className="menu p-2 w-full bg-neutral text-white">
          <div className="flex justify-between items-center gap-x-4 w-full">
            <LogoEmprega className="w-60" />
            <label htmlFor="drawer-navbar" className="drawer-overlay">
              <BiX className="text-5xl" />
            </label>
          </div>
          <div className="mt-4">
            <Accordion
              items={accordionCandidatos}
              name={'Candidatos'}
              onClick={closeDrawer}
            />
            <Accordion
              items={accordionEmpresas}
              name={'Empresas'}
              onClick={closeDrawer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
