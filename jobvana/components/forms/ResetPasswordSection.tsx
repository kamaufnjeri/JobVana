import React, { useState } from "react";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";
import { ResetPasswordProps } from "@/interfaces";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";

const ResetPasswordSection: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordProps>({
    email: "",
    confirmPassword: "",
    otp: 0,
    new_password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // handling change of input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submiting for login data
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const confirmPassword = formData.confirmPassword;
    delete formData.confirmPassword;

    if (confirmPassword === formData.new_password) {
      try {
        const response = await api.post("auth/password-reset/reset/", formData);

        if (response.status === 201) {
          toast.success("User password reset successful!");
          router.push("/login");
        }
      } catch (error) {
        console.error("Reset password failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
        setFormData((prev) => ({
          ...prev,
          new_password: "",
          confirmPassword: "",
          otp: 0,
        }));
        
      }
    } else {
      toast.error("Confirm password and new password must match");
      setLoading(false);
    }
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full items-center justify-center lg:w-4/5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-lg shadow-lg p-5"
      >
        <h2 className="text-h2">Reset Password</h2>

        <h5 className="text-h5">
          For your security, the OTP expires in 5 minutes from when you received the message.
        </h5>

        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="name" className="text-h6 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>
        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="otp" className="text-h6 font-medium">
            OTP
          </label>
          <input
            type="number"
            name="otp"
            id="otp"
            required
            min={0}
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter otp"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>
        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="new_password" className="text-h6 font-medium">
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            required
            value={formData.new_password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>
        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="confirmPassword" className="text-h6 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>
        <Button
          type="submit"
          loading={loading}
          name="Reset Password"
          styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />

        <span className="text-h6 flex flex-row self-end gap-1">
          <h6>Remembered your password?</h6>
          <Link prefetch={true} href="/login" className="text-primary">
            {" "}
            Log in here
          </Link>
        </span>
      </form>
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
            “We’re here to help you get back to your next opportunity. Simply
            reset your password and continue where you left off.”
          </p>
          <p className="text-p stylish italic">— Florence Kamau</p>
          <h6 className="text-h6 font-semibold">Founder & CEO</h6>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSection;
