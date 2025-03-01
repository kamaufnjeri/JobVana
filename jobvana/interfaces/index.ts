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
export interface JobApplicationProps {
          job_name: string;
          status: string;
          availability: string;
          linkedin_url: string;
          cover_letter: string;
          resume: string; 
          date_applied: string;
        };

        export interface ApplicationReceivedProps {
            first_name: string
            last_name: string;
            status: string;
            availability: string;
            linkedin_url: string;
            cover_letter: string;
            resume: string; 
            date_applied: string;
          };

        export interface CompanyProps {
            name: string;
            description: string;
            logo: string;
        }

export interface UserProps {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    company?: CompanyProps;
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

export interface JobPostedDetailsProps {

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