import { SAMPLE_TOP_COMPANIES } from "@/constants";
import Image from "next/image";
import React from "react";

const TopCompaniesSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-2 items-center justify-start shadow-lg rounded-lg p-2">
        <h2 className="text-h2">
          Top Companies Hiring
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center w-full">
          {SAMPLE_TOP_COMPANIES.map((company, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 relative">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <p className="text-p opacity-90">
                {company.name}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
};

export default TopCompaniesSection;
