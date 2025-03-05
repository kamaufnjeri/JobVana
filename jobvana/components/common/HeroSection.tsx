import { HeroProps } from "@/interfaces";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

const HeroSection: React.FC<HeroProps> = ({ name, description }) => {
  return (
    <section className="hero w-full rounded-lg h-auto">
      <div className="w-full h-full bg-gray-900  bg-opacity-50 rounded-lg text-white flex flex-col items-start p-5 justify-start">
        <div className="flex flex-col gap-2 lg:w-1/2 md:w-2/3 w-full">
          <h1 className="text-4xl lg:text-6xl md:text-6xl font-extrabold">
            {name}
          </h1>
          {description && <p className="readable text-h5">{description}</p>}

          <Link
            prefetch={true}
            href="/jobs"
            className="rounded-full bg-white flex flex-row py-2 px-4 gap-2 justify-between text-gray-800 lg:w-1/2 md:w-1/2 w-[200px]"
          >
            <h5 className="lg:text-h5 text-h6 md:text-h5">Explore Jobs Now</h5>
            <FaCircleArrowRight className="text-secondary md:text-2xl lg:text-2xl text-xl" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
