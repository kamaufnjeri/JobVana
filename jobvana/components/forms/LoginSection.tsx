import React from "react";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";


const LoginSection: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4  h-full items-center justify-center lg:w-4/5">
      <LoginForm />
      <div className=" bg-primary h-full rounded-lg text-white flex flex-col gap-2 items-center justify-center p-5">
        <div className="w-full h-auto rounded-md relative">
          <Image
            alt={"Sign Up Image"}
            src={"/images/contact-us.jpg"}
            width={300}
            height={0}
            priority
            layout="responsive"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 items-end justify-end">
          <h1 className="text-h1">Welcome to JobVana.</h1>
          <p className="text-p readable text-right">
            “Log in to unlock your next opportunity. Whether you're seeking
            talent or looking for your dream job, we’re here to connect you with
            the right people.”
          </p>
          <p className="text-p stylish italic">— Florence Kamau</p>
          <h6 className="text-h6 font-semibold">Founder & CEO</h6>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
