import { SAMPLE_FAQS } from "@/constants";
import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({
    jobSeekers: null,
    employers: null,
    general: null,
  });
  const faqRefs = useRef<{
    [key: string]: { [index: number]: HTMLDivElement | null };
  }>({});
  const answerRefs = useRef<{
    [key: string]: { [index: number]: HTMLDivElement | null };
  }>({});

  const toggleFAQ = (category: string, index: number) => {
    if (!faqRefs.current[category]) {
      faqRefs.current[category] = {};
    }

    if (!answerRefs.current[category]) {
      answerRefs.current[category] = {};
    }

    const chevronElement = faqRefs.current[category][index];

    const answerElement = answerRefs.current[category][index];

    if (chevronElement) {
      chevronElement.classList.toggle("rotate-180");
    }

    if (answerElement ) {
      if (openIndex[category] === index) {
        answerElement.classList.remove("max-h-40", "opacity-90");

        answerElement.classList.add("max-h-0", "opacity-0");
      } else {
      answerElement.classList.remove("max-h-0", "opacity-0");
      answerElement.classList.add("max-h-40", "opacity-90");
      }
    }
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };
  return (
    <section className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg w-full gap-4">
      <h3 className="text-h3 text-primary">Frequently Asked Questions</h3>
      <h2 className="text-h2">
        Find answers to common questions about JobVana
      </h2>
      {SAMPLE_FAQS &&
        SAMPLE_FAQS.map((category, categoryIndex) => (
          <div
            className="flex flex-col items-start self-start gap-4 w-full"
            key={categoryIndex}
          >
            <h4 className="text-h4 font-semibold">{category.category}</h4>
            <ul className="flex flex-col gap-6 items-start w-full">
              {category.questions &&
                category.questions.map((question, questionIndex) => (
                  <li
                    key={`${categoryIndex}-${questionIndex}`}
                    onClick={() => toggleFAQ(category.category, questionIndex)}
                    className="flex flex-col gap-4 items-start w-full"
                  >
                    <span className="flex flex-row justify-between gap-2 w-full">
                      <h5 className="text-h5 font-medium">
                        {question.question}
                      </h5>
                      <div
                        ref={(el) => {
                          if (!faqRefs.current[category.category])
                            faqRefs.current[category.category] = {};
                          faqRefs.current[category.category][questionIndex] =
                            el;
                        }}
                        className="transition-transform duration-300"
                      >
                        <FaChevronDown />
                      </div>
                    </span>

                    <p
                      className="text-p opacity-0 max-h-0 transition-all duration-300 text-left"
                      ref={(el) => {
                        if (!answerRefs.current[category.category])
                          answerRefs.current[category.category] = {};
                        answerRefs.current[category.category][questionIndex] =
                          el;
                      }}
                    >
                      {question.answer}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </section>
  );
};

export default FAQSection;
