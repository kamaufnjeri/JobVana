import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}
export interface SelectValuesProps {
  value: string; // Unique identifier for each category
  label: string; // Display name for each category
}
export interface ButtonProps {
  name: string;
  styles?: string;
  type?: "submit" | "button";
  onClick?: (...args: any[]) => void | any;
  children?: ReactNode;
  loading?: boolean;
}


// Define a TypeScript interface for the job props (as a dictionary)
export interface JobDetailProps {
  description: string;
  type: string;
}

export interface JobPostProps {
  title: string;
  description: string;
  experience_level: string;
  max_salary: number;
  min_salary: number;
  deadline: string;
  category: string[];
  location: string;
  job_type: string;
  details?: JobDetailProps[];
}



export interface ManyJobsProps {
  company_name: string;
  logo?: string;
  categories: string[];
  location: string;
  type: string;
  level: string;
  job_name: string;
  date_posted: string;
}
export interface JobApplicationProps {
  job_name: string;
  status: string;
  availability: string;
  linkedin_url: string;
  cover_letter: string;
  resume: string;
  date_applied: string;
}

export interface ApplicationReceivedProps {
  first_name: string;
  last_name: string;
  status: string;
  availability: string;
  linkedin_url: string;
  cover_letter: string;
  resume: string;
  date_applied: string;
}

export interface CompanyProps {
  name: string;
  id: string;
}
// interface for user data
export interface UserProps {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  company?: CompanyProps | "";
  id: string;
}

// interface for registering user

export interface SignUpUserProps {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword?: string;
}

// interface for the login user

export interface LoginProps {
  email: string;
  password: string;
}

// reset password interface

export interface ResetPasswordProps {
  email: string;
  otp: number;
  new_password: string;
  confirmPassword?: string;
}
export interface JobDetailsProps {
  responsibilities: string[];
  benefits: string[];
  requirements: string[];
  description: string;
  company_name: string;
  logo?: string;
  categories: string[];
  location: string;
  type: string;
  level: string;
  job_name: string;
  date_posted: string;
}

export interface JobPostedDetailsProps {}

export interface TestimonialProps {
  name: string;
  image: string;
  message: string;
  role: string;
}

export interface HeroProps {
  name: string;
  description?: string;
}

export interface TopCompaniesProps {
  name: string;
  logo: string;
}

export interface TeamMembersProps {
  name: string;
  image: string;
  description: string;
  role: string;
}

export interface QuestionProps {
  question: string;
  answer: string;
}

export interface FAQSProps {
  category: string;
  questions: QuestionProps[];
}
