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
    type?: 'submit' | 'button';
    onClick?: (...args: any[]) => void | any;
    children?: ReactNode;
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

export interface JobDetailsProps {
    responsibilities?: string[];
    benefits?: string[];
    requirements?: string[];
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