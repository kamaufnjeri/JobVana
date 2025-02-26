import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import { FaArrowPointer } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const ContactUsSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg w-full gap-4">
      <h3 className="text-h3 text-primary">Contact Us</h3>
      <h2 className="text-h2">We'd love to hear from you!</h2>
      <p className="text-p opacity-90 max-w-2xl">
        Have any questions or inquiries? Reach out to us using the form below or
        through our contact details.
      </p>
      <div className="flex flex-col md:flex-row lg:flex-row gap-4 items-center justify-center">
        <div className="w-full h-auto md:w-1/2 lg:w-1/2 rounded-md relative">
          <Image
            alt={"Contact us Image"}
            src={"/images/contact-us.jpg"}
            width={0}
            height={0}
            priority
            layout="responsive"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <form className="w-full h-auto md:w-1/2 lg:w-1/2 rounded-md relative gap-4 p-2 flex flex-col">
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="name" className="text-h6 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter name"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            />
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="name" className="text-h6 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter email"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            />
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="subject" className="text-h6 font-medium">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="name"
              required
              placeholder="Enter subject"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500"
            />
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="message" className="text-h6 font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Enter message"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            ></textarea>
          </span>
          <Button
            type="submit"
            name="Submit"
            styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
            children={<FaArrowRight />}
          />
        </form>
      </div>
    </section>
  );
};

export default ContactUsSection;
