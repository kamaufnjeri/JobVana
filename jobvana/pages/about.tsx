import ContactUsSection from "@/components/about/ContactUsSection";
import FAQSection from "@/components/about/FAQSection";
import OurTeamSection from "@/components/about/OurTeamSection";
import WhyJobVanaSection from "@/components/about/WhyJobVanaSection";
import HeroSection from "@/components/common/HeroSection";
import StatsSection from "@/components/common/StatsSection";
import { HeroProps } from "@/interfaces";
import React from "react";

const aboutHeroSection: HeroProps = {
  name: "About JobVana - Your Trusted Job Platform",
  description: ` JobVana is a leading platform connecting job seekers with top employers.
    Our mission is to make job searching easy, efficient, and accessible
    for everyone. Whether you're looking for your next opportunity or the
    perfect candidate, JobVana is here to help.`,
};

const about: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 lg:px-10 md:px-5 px-2 py-2 min-w-screen">
      <HeroSection
        name={aboutHeroSection.name}
        description={aboutHeroSection.description}
      />
      <StatsSection />
      <WhyJobVanaSection />
      <OurTeamSection />
      <FAQSection />
      <ContactUsSection />
    </div>
  );
};

export default about;
