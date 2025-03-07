import { ReactNode } from "react";


export interface CompanyProps {
  name: string;
  description: string,
  id?: string;
}


export interface PaginatedResponse<T> {
  total_count: number; // Total number of items
  total_pages: number; // Total number of pages
  current_page: number; // Current page number
  page_size: number; // Number of items per page
  next: string | null; // URL for the next page
  previous: string | null; // URL for the previous page
  results: T[]; // Array of items
}


export interface JobProps {
  id: string;
  title: string;
  description: string;
  company_details: CompanyProps; 
  max_salary: number;
  min_salary: number;
  is_active: boolean;
  categories: string[];
  location: string;
  job_type: string;
  posted_by: string; 
  created_at: string;
  deadline?: string;
  experience_level?: string;
  details?: any[]; 
}

export interface JobResponseProps {
    count: number;
    next: string | null;
    previous: string | null;
    results: JobProps[];
}

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
  id?: string | number
  type: string;
}

export interface JobFilterProps {

  [key: string]: any; // Allow additional properties
}

export interface JobPostProps {
  title: string;
  description: string;
  experience_level: string ;
  max_salary: number | null;
  min_salary: number | null;
  deadline: string;
  categories: string[];
  location: string ;
  job_type: string ;
  details: JobDetailProps[];
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
  confirm_password?: string;
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
  password: string;
  confirm_password?: string;
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
