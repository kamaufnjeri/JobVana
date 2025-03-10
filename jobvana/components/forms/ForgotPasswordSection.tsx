import React, { useState } from "react";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { useRouter } from "next/router";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { routeToNextPage } from "@/utils/navigateUtils";

const ForgotPasswordSection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string }>({
    email: "",
  });
  const router = useRouter();

  // handling change of input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("auth/forgot-password/", formData);
      if (response.status === 200) {
        // Handle success
        routeToNextPage(router, { pageRoute: '/reset-password' });
        toast.success(response?.data?.message);

        setFormData({
          email: "",
        });
      } else if (response.data.error) {
        toast.error(
          response.data.error || "Reset password otp not sent failed"
        );
      } else {
        throw new Error("Reset password otp not sent failed");
      }
    } catch (error) {
      const errorMessage = handleApiError(error);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full items-center justify-center lg:w-4/5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-lg shadow-lg p-5"
      >
        <h2 className="text-h2">Forgot Password</h2>
        <h5 className="text-h5">
          Forgot your password? No worries, we’ll help you get back on track!
        </h5>

        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="email" className="text-h6 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>

        <Button
          type="submit"
          loading={loading}
          name="Send OTP"
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

      <div className="bg-primary h-full rounded-lg text-white flex flex-col gap-2 items-center justify-center p-5">
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

export default ForgotPasswordSection;
