import React, { useState } from "react";
import Button from "../common/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LoginProps } from "@/interfaces";


interface LoginComponentProps {
  description?: string;
  toDashboard?: boolean;
}

const LoginForm: React.FC<LoginComponentProps> = ({ description, toDashboard=true }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  // handling change of input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submiting for login data
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await login(formData, setFormData, toDashboard);
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 rounded-lg shadow-lg p-5"
    >
      <h2 className="text-h2">Login</h2>
      <h5 className="text-h5">
        {description ? description : "Login to post jobs or appy for jobs"}
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
          required
          onChange={handleChange}
          placeholder="Enter email"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
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
          onChange={handleChange}
          value={formData.password}
          placeholder="Enter password"
          className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </span>
      <Button
        loading={loading}
        type="submit"
        name="Login"
        styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
      />
      <span className="flex gap-2 flex-wrap items-end justify-between">
        <span className="text-h6 flex flex-row gap-1">
          <Link
            prefetch={true}
            href="/forgot-password"
            className="text-primary"
          >
            Forgot password?
          </Link>
        </span>
        <span className="text-h6 flex flex-row gap-1">
          <h6>Don&apos;t have an account?</h6>
          <Link prefetch={true} href="/sign-up" className="text-primary">
            Sign Up
          </Link>
        </span>
      </span>
    </form>
  );
};

export default LoginForm;
