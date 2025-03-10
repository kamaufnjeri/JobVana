import React, { useState } from "react";
import Button from "../common/Button";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import { USER_ROLES } from "@/constants";
import { SignUpUserProps } from "@/interfaces";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { handleApiError } from "@/utils/errorHandlerUtils";
import { toast } from "react-toastify";
import { routeToNextPage } from "@/utils/navigateUtils";

const SignUpSection: React.FC = () => {
  const [formData, setFormData] = useState<SignUpUserProps>({
    email: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  // handling change of input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    /* 
    if (name === "password") {
      // ensure the password is strong 
      validatePassword(value, setError);
    } */
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submiting for login data
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    
      try {
        const response = await api.post("auth/sign-up/", formData);

        if (response.status === 201) {
          routeToNextPage(router, { pageRoute: "/login" });
          toast.success(response?.data?.message);
          setFormData({
            email: "",
            password: "",
            role: "",
            confirm_password: "",
            first_name: "",
            last_name: "",
        });
    } else if (response.data.error) {
        toast.error(response.data.error || 'Registration failed');
    } else {
        throw new Error('Registration failed');
    }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
        setFormData((prev) => ({ ...prev, password: "", confirm_password: "" }));
      }
    };

    console.log(formData)

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-full items-center justify-center lg:w-4/5">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-2 rounded-lg shadow-lg p-5"
      >
        <h2 className="text-h2">Sign Up</h2>
        <h5 className="text-h5">Sign Up to post jobs or appy for jobs</h5>
        <span className="flex flex-col gap-2 lg:flex-row md:flex-row">
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="first_name" className="text-h6 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </span>
          <span className="flex flex-col gap-2 items-start">
            <label htmlFor="last_name" className="text-h6 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </span>
        </span>

        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="email" className="text-h6 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>

        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="role" className="text-h6 font-medium">
            Role
          </label>
          <Select
            className="rounded-md text-gray-800 outline-none w-full border border-borderColor z- p-2 focus:ring-2 focus:ring-blue-500"
            options={USER_ROLES} // Use filtered locations based on search
            getOptionLabel={(e) => e.label} // Ensure label is displayed correctly
            getOptionValue={(e) => e.value} // Ensure value is stored correctly
            value={USER_ROLES.find((option) => option.value === formData.role)} // Match selected value
            onChange={(selectedOption) => {
              setFormData((prev) => ({
                ...prev,
                role: selectedOption?.value || "",
              })); // Update state correctly
            }}
            placeholder="Select role"
            isSearchable
          />
        </span>

        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="password" className="text-h6 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          {error && <span className="text-p text-red-500">{error}</span>}
        </span>
        <span className="flex flex-col gap-2 items-start">
          <label htmlFor="confirm_password" className="text-h6 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm password"
            className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </span>
        <Button
          type="submit"
          name="Sign Up"
          loading={loading}
          styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
        />
        <span className="text-h6 flex flex-row self-end gap-1">
          <h6>Already have an a ccount?</h6>
          <Link prefetch={true} href="/login" className="text-primary">
            Login
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
            “Join a community where your skills meet opportunity. Whether you're
            an employer looking for talent or a job seeker ready for your next
            career move, JobVana is the place to grow.”
          </p>
          <p className="text-p stylish italic">— Florence Kamau</p>
          <h6 className="text-h6 font-semibold">Founder & CEO</h6>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
