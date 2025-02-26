import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const WhyJobVanaSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-start border-borderColor border shadow-lg p-2 rounded-lg">
      <h2 className="text-h2">Why JobVana?</h2>
      <div className="flex flex-col gap-2 items-start px-5">
        <div className="flex lg:flex-row md:flex-row flex-col gap-4 items-center">
          <div className="w-full lg:w-1/2 md:w-1/2 h-auto rounded-md">
            <Image
              alt="Job seeker image"
              src={"/images/job-seeker.jpg"}
              width={0}
              height={0}
              layout="responsive"
              priority
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-1/2 md:w-1/2">
            <h3 className="text-h3 text-primary">Job Seekers</h3>

            <h4 className="text-h4 font-semibold">
              Take the next step in your career with JobVana.
            </h4>
            <p className="text-p">
              Easily browse thousands of job listings, apply in just a few
              clicks, and keep track of your applications—all in one place.
            </p>
            <div className="flex flex-col gap-2">
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">Apply for Jobs</h6>
                  <p className="text-small opacity-90">
                    Find and apply to jobs that match your skills with ease.
                  </p>
                </div>
              </span>
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">Save Jobs for Later</h6>
                  <p className="text-small opacity-90">
                    Bookmark job posts and come back when you're ready to apply.
                  </p>
                </div>
              </span>
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">
                    Track Application Status
                  </h6>
                  <p className="text-small opacity-90">
                    Stay updated with real-time progress updates: Pending, Under
                    Review, or Accepted.
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start px-5">
        <div className="flex lg:flex-row-reverse md:flex-row-reverse flex-col gap-4 items-center">
          <div className="w-full lg:w-1/2 md:w-1/2 h-auto rounded-md">
            <Image
              alt="Employers image"
              src={"/images/interview.jpg"}
              width={0}
              height={0}
              layout="responsive"
              priority
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-1/2 md:w-1/2">
            <h3 className="text-h3 text-primary">Employers</h3>

            <h4 className="text-h4 font-semibold">
              Hire the best talent and build your dream team with JobVana.
            </h4>
            <p className="text-p">
              Post jobs, review applications, and make hiring decisions with
              confidence.
            </p>
            <div className="flex flex-col gap-2">
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">Post Jobs</h6>
                  <p className="text-small opacity-90">
                    Easily create job listings and reach thousands of qualified
                    candidates.
                  </p>
                </div>
              </span>
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">Receive Applications</h6>
                  <p className="text-small opacity-90">
                    Get applications directly on JobVana and manage them
                    effortlessly.
                  </p>
                </div>
              </span>
              <span className="flex flex-row gap-2 items-center">
                <FaArrowRight className="text-2xl text-primary" />
                <div className="flex flex-col">
                  <h6 className="text-h6 text-medium">Review & Hire Talent </h6>
                  <p className="text-small opacity-90">
                    Shortlist candidates, schedule interviews, and make informed
                    hiring decisions.
                  </p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
};
export default WhyJobVanaSection;
