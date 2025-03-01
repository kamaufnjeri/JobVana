import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'


interface LoginProps {
    description?: string;
}

const LoginForm: React.FC<LoginProps> = ({ description }) => {
  return (
    <form className="w-full flex flex-col gap-2 rounded-lg shadow-lg p-5">
    <h2 className="text-h2">Login</h2>
    <h5 className="text-h5">{description ? description : 'Login to post jobs or appy for jobs'}</h5>
    
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
        placeholder="Enter password"
        className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
      />
    </span>
    <Button
      type="submit"
      name="Login"
      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-center"
    />
    <span className="flex gap-2 flex-wrap items-end justify-between">
    <span className="text-h6 flex flex-row gap-1">
      
      <Link href="/forgot-password" className="text-primary">Forgot password?</Link>
    </span>
    <span className="text-h6 flex flex-row gap-1">
      <h6>Don't have an account?</h6>
      <Link href="/sign-up" className="text-primary">Register</Link>
    </span>
    </span>
   
  </form>
  )
}

export default LoginForm
