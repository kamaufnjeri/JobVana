import { SAMPLE_TEAM_MEMBERS } from "@/constants";
import Image from "next/image";
import React from "react";

const OurTeamSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg">
      <h3 className="text-h3 text-primary">Meet Our Team</h3>
      <h2 className="text-h2">The amazing people behind JobVana</h2>
      {SAMPLE_TEAM_MEMBERS && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 w-full">
          {SAMPLE_TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-auto h-[400px] rounded-md relative">
                <Image
                  alt={member.name}
                  src={member.image}
                  width={400}
                  height={400}
                  priority
                  className="w-auto h-[400px] object-cover rounded-md"
                />
              </div>
              <div className="bg-primary p-2 text-white flex flex-col gap-2 items-start rounded-lg">
                <span className="flex flex-row gap-2 items-start">
                  <h6 className="text-h6">{member.name}</h6>
                  <p>-</p>
                  <p className="text-p opacity-80">{member.role}</p>
                </span>
                <p className="text-p text-left">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OurTeamSection;
