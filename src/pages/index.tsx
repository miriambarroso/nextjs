import MaisBuscadosSection from '@/components/home/MaisBuscadosSection';
import OportunidadesDestaqueSection from '@/components/home/OportunidadesDestaqueSection';
import BannerEmpresas from '@/components/home/BannerEmpresas';
import BannerCandidatos from '@/components/home/BannerCandidatos';
import HeroSection from '@/components/home/HeroSection';
import TopicosSection from '@/components/home/TopicosSection';
import { useAuthStore } from '@/store/auth';

const Page = () => {
  const [isGuest, isCandidato, isEmpregador] = useAuthStore((state) => [
    state.isGuest,
    state.isCandidato,
    state.isEmpregador,
  ]);

  return (
    <>
      <div className="container space-y-16 pb-8">
        <HeroSection />
        <TopicosSection />
        {!isEmpregador() ? <BannerCandidatos /> : null}
        <OportunidadesDestaqueSection />
        {!isCandidato() ? <BannerEmpresas /> : null}
        <MaisBuscadosSection />
      </div>
    </>
  );
};

Page.overrideLayout = 'bg-white';

export default Page;
