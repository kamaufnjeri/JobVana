import HeroSection from "@/components/common/HeroSection";
import StatsSection from "../components/common/StatsSection";
import WhyJobVanaSection from "@/components/about/WhyJobVanaSection";
import TestimonialSection from "@/components/about/TestimonialSections";
import { HeroProps, JobProps, PaginatedResponse } from "@/interfaces";
import HomeJobsSection from "@/components/home/HomeJobsSection";
import TopCompaniesSection from "@/components/home/TopCompaniesSection";
import api from "@/utils/api";
import { GetStaticProps } from "next";

const homeHeroSection: HeroProps = {
  name: "Your ultimate destination for job success!",
  description: `Join thousands of professionals and companies on JobVana—the
  platform that connects you to your next opportunity. Discover top
  career opportunities or find the perfect candidate with ease.`,
};
const Home: React.FC<{ jobsData: PaginatedResponse<JobProps> }> = ({
  jobsData,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <HeroSection
        name={homeHeroSection.name}
        description={homeHeroSection.description}
      />

      <StatsSection />
      <HomeJobsSection jobsData={jobsData} />
      <WhyJobVanaSection />
      <TestimonialSection />
      <TopCompaniesSection />
    </div>
  );
};

// fetch jobs from server side to display on home page
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get("jobs/");
    if (response.status === 200) {
      const jobsData = response.data;

      return {
        props: {
          jobsData,
        },
        revalidate: 3600, // Revalidate every hour to keep data fresh
      };
    } else {
      throw new Error("Failed to fetch jobs");
    }
  } catch (error) {
    return {
      props: {
        jobsData: [], // Empty array if something goes wrong
      },
    };
  }
};
export default Home;
