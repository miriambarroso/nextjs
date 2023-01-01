import MaisBuscadosSection from '@/components/home/MaisBuscadosSection';
import OportunidadesDestaqueSection from '@/components/home/OportunidadesDestaqueSection';
import BannerEmpresas from '@/components/home/BannerEmpresas';
import BannerCandidatos from '@/components/home/BannerCandidatos';
import HeroSection from '@/components/home/HeroSection';
import TopicosSection from '@/components/home/TopicosSection';

const Page = () => {
  return (
    <>
      <div className="container space-y-16 pb-8">
        <HeroSection />
        <TopicosSection />
        <BannerCandidatos />
        <OportunidadesDestaqueSection />
        <BannerEmpresas />
        <MaisBuscadosSection />
      </div>
    </>
  );
};

Page.overrideLayout = 'bg-white';

export default Page;
