import { SAMPLE_TESTIMONIALS } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const TestimonialSection: React.FC = () => {
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex === SAMPLE_TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? SAMPLE_TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="flex flex-col items-center text-center p-6">
      <h3 className="text-h3 text-primary">Testimonials</h3>
      <h2 className="text-h2">What our users say about JobVana</h2>

      <div className="relative shadow-lg rounded-lg p-6 w-full flex flex-col md:flex-row lg:flex-row items-center gap-4">
        {/* Animate Presence for smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonialIndex}
            initial={{ opacity: 0, x: 50 }} // Initial hidden state
            animate={{ opacity: 1, x: 0 }} // Animate to visible
            exit={{ opacity: 0, x: -50 }} // Smooth exit transition
            transition={{ duration: 0.5 }} // Smooth transition timing
            className="flex flex-col gap-2 w-full lg:w-1/2 md:w-1/2 items-start justify-start"
          >
            <p className="text-lg italic text-left">
              "{SAMPLE_TESTIMONIALS[testimonialIndex].message}"
            </p>
            <span className="flex flex-row gap-2 items-center justify-center">
              <h6 className="text-h6 text-primary">
                {SAMPLE_TESTIMONIALS[testimonialIndex].name}
              </h6>
              <p>-</p>
              <p className="text-p opacity-80">
                {SAMPLE_TESTIMONIALS[testimonialIndex].role}
              </p>
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="w-auto h-[400px] rounded-md relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-auto h-[400px] rounded-md relative"
            >
              <Image
                alt={SAMPLE_TESTIMONIALS[testimonialIndex].name}
                src={SAMPLE_TESTIMONIALS[testimonialIndex].image}
                width={400}
                height={400}
                priority
                className="w-auto h-[400px] object-cover rounded-md"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={prevTestimonial}>
          <FaArrowCircleLeft className="text-3xl" />
        </button>
        <button onClick={nextTestimonial}>
          <FaArrowCircleRight className="text-3xl" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;
