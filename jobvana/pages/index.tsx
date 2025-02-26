import HeroSection from "@/components/common/HeroSection";
import StatsSection from "../components/common/StatsSection";
import WhyJobVanaSection from "@/components/about/WhyJobVanaSection";
import TestimonialSection from "@/components/about/TestimonialSections";
import { HeroProps } from "@/interfaces";
import HomeJobsSection from "@/components/home/HomeJobsSection";
import TopCompaniesSection from "@/components/home/TopCompaniesSection";

const homeHeroSection: HeroProps = {
  name: "Your ultimate destination for job success!",
  description: `Join thousands of professionals and companies on JobVana—the
  platform that connects you to your next opportunity. Discover top
  career opportunities or find the perfect candidate with ease.`,
};
const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <HeroSection
        name={homeHeroSection.name}
        description={homeHeroSection.description}
      />

      <StatsSection />
      <HomeJobsSection />
      <WhyJobVanaSection />
      <TestimonialSection />
      <TopCompaniesSection/>
    </div>
  );
};

export default Home;
