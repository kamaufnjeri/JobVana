import {
  ApplicationReceivedProps,
  FAQSProps,
  JobApplicationProps,
  JobDetailsProps,
  ManyJobsProps,
  SelectValuesProps,
  TeamMembersProps,
  TestimonialProps,
  TopCompaniesProps,
  UserProps,
} from "@/interfaces";

export const USER_ROLES: SelectValuesProps[] = [
  { value: "applicant", label: "Applicant" },
  { value: "employer", label: "Employer" },
];

export const JOB_DETAILS_OPTIONS: SelectValuesProps[] = [
  { value: "Responsibility", label: "Responsibility" },
  { value: "Requirement", label: "Requirement" },
  { value: "Benefit", label: "Benefit" }
];

export const JOB_EXPERIENCE_OPTIONS: SelectValuesProps[] = [
  { value: "Entry-level", label: "Entry-level" },
  { value: "Mid-level", label: "Mid-level" },
  { value: "Senior-level", label: "Senior-level" },
];

export const JOB_TYPES_OPTIONS: SelectValuesProps[] = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Contract", value: "Contract" },
  { label: "Freelance", value: "Freelance" },
  { label: "Internship", value: "Internship" }
];



export const AVAILABILITY_OPTIONS: SelectValuesProps[] = [
  { value: "Available Immediately", label: "Available Immediately" },
  { value: "Available in 1 Month", label: "Available in 1 Month" },
  { value: "Available in 2 Months", label: "Available in 2 Months" },
  { value: "Available in 3 Months", label: "Available in 3 Months" },
  { value: "Available in 6 Months", label: "Available in 6 Months" },
];


export const EXPERIENCE_LEVELS_OPTIONS: SelectValuesProps[] = [
  { value: "internship", label: "Internship" },
  { value: "entry-level", label: "Entry-Level" },
  { value: "mid-level", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "others", label: "Others" },
];

export const JOB_TYPES_OPTIONS_2: SelectValuesProps[] = [
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "contract", label: "Contract" },
];

export const EXPERIENCE_LEVELS = EXPERIENCE_LEVELS_OPTIONS;

export const JOB_TYPES = JOB_TYPES_OPTIONS;

export const APPLICATIONS_STATUS_OPTIONS: SelectValuesProps[] = [
  { label: "Pending", value: "pending" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Hired", value: "hired" },
  { label: "Rejected", value: "rejected" },
  { label: "Forwarded for Interview", value: "forwarded_interview" },
];

export const SORT_BY_OPTIONS: SelectValuesProps[] = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
];



export const SAMPLE_USER_APPLICANT: UserProps = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@example.com",
  role: "applicant",
  id: "1",
};

export const SAMPLE_USER_EMPLOYER: UserProps = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@example.com",
  role: "employer",
  id: "1",
  company: {
    name: "Microsoft",
    description: "",
    id: "1",
  },
};

export const APPLICATIONS_RECEIVED: ApplicationReceivedProps[] = [
  {
    first_name: "John",
    last_name: "Doe",
    linkedin_url: "https://www.linkedin.com/in/johndoe",
    date_applied: "2025-02-28",
    status: "pending",
    availability: "immediate",
    resume:
      "https://res.cloudinary.com/dpbkthtxd/image/upload/v1741109693/Payments_for_purchase_PURCH-1_wbt0ga.pdf",
    cover_letter:
      "I am excited to apply for this position as it aligns perfectly with my skills and experience. I believe my background in software development will be valuable to your team.",
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    linkedin_url: "https://www.linkedin.com/in/janesmith",
    date_applied: "2025-02-27",
    status: "forwarded_interview",
    availability: "immediate",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
    cover_letter:
      "With a strong background in business analytics and problem-solving, I am eager to contribute my expertise to your organization. I look forward to the opportunity to discuss further.",
  },
  {
    first_name: "Michael",
    last_name: "Brown",
    linkedin_url: "https://www.linkedin.com/in/michaelbrown",
    date_applied: "2025-02-26",
    status: "forwarded_interview",
    availability: "immediate",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
    cover_letter:
      "I have a passion for data-driven decision-making and would love to bring my analytical skills to your team. My experience in financial analysis makes me a great fit for this role.",
  },
  {
    first_name: "Emily",
    last_name: "Clark",
    linkedin_url: "https://www.linkedin.com/in/emilyclark",
    date_applied: "2025-02-25",
    status: "rejected",
    availability: "two_months",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
    cover_letter:
      "As a dedicated professional with expertise in customer relations, I am confident in my ability to enhance client satisfaction and operational efficiency within your organization.",
  },
  {
    first_name: "Daniel",
    last_name: "Wilson",
    linkedin_url: "https://www.linkedin.com/in/danielwilson",
    date_applied: "2025-02-24",
    status: "hired",
    availability: "one_month",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
    cover_letter:
      "I am eager to leverage my experience in software engineering to drive innovation and efficiency in your company. Looking forward to contributing to your success.",
  },
];

export const SAMPLE_JOB_APPLICATIONS: JobApplicationProps[] = [
  {
    job_name: "Software Engineer",
    status: "pending",
    availability: "immediate",
    linkedin_url: "https://www.linkedin.com/in/johndoe",
    cover_letter:
      "I am excited about this role because of my passion for software development...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
  {
    job_name: "Backend Developer",
    status: "hired",
    availability: "one_month",
    linkedin_url: "https://www.linkedin.com/in/janedoe",
    cover_letter:
      "With my experience in backend development and databases, I believe I can add value...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
  {
    job_name: "Data Analyst",
    status: "rejected",
    availability: "two_months",
    linkedin_url: "https://www.linkedin.com/in/mikebrown",
    cover_letter:
      "I have a strong background in data analysis and visualization...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
  {
    job_name: "Product Manager",
    status: "pending",
    availability: "three_months",
    linkedin_url: "https://www.linkedin.com/in/sarasmith",
    cover_letter:
      "My experience in product strategy and agile development makes me a great fit...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
  {
    job_name: "UX Designer",
    status: "hired",
    availability: "six_months",
    linkedin_url: "https://www.linkedin.com/in/kevinyang",
    cover_letter:
      "I specialize in creating user-friendly designs and improving UX...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
  {
    job_name: "Cybersecurity Analyst",
    status: "forwarded_interview",
    availability: "immediate",
    linkedin_url: "https://www.linkedin.com/in/laurajohnson",
    cover_letter:
      "I have expertise in network security, ethical hacking, and risk assessment...",
    date_applied: "2024-02-25",
    resume:
      "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf",
  },
];

export const SAMPLE_JOB: JobDetailsProps = {
  company_name: "Google",
  logo: "https://logo.clearbit.com/google.com",
  job_name: "Software Engineer",
  categories: ["engineering", "technology"],
  location: "San Francisco, CA",
  type: "full-time",
  level: "mid-level",
  date_posted: "2025-02-20",
  description:
    "Google is seeking a talented and motivated Software Engineer to join our dynamic team. As part of our development team, you will work on cutting-edge technologies to build and maintain high-quality software solutions. This is an excellent opportunity to collaborate with a group of innovative engineers in a fast-paced, remote environment. If you’re passionate about solving complex problems and writing clean, scalable code, we want to hear from you!",
  responsibilities: [
    "Design, develop, and maintain scalable and high-performance software applications.",
    "Collaborate with product managers and designers to define and implement new features.",
    "Write clean, maintainable, and efficient code while following best practices.",
    "Participate in code reviews and contribute to continuous improvement of development processes.",
    "Debug, troubleshoot, and resolve issues related to software performance and functionality.",
    "Stay up-to-date with the latest industry trends, technologies, and development practices.",
    "Work in an Agile environment with weekly sprints, team meetings, and performance tracking.",
  ],

  requirements: [
    "Bachelor's degree in Computer Science, Engineering, or a related field.",
    "3+ years of professional software engineering experience.",
    "Strong proficiency in at least one programming language (JavaScript, Python, Java, etc.).",
    "Experience with web development frameworks such as React, Angular, or Vue.js.",
    "Familiarity with backend technologies like Node.js, Express, or Django.",
    "Knowledge of version control systems (Git).",
    "Familiarity with databases (SQL and NoSQL databases like PostgreSQL, MongoDB).",
    "Strong understanding of algorithms, data structures, and problem-solving techniques.",
    "Strong communication skills and ability to work in a collaborative team environment.",
    "Excellent problem-solving and debugging skills.",
    "Ability to manage time effectively and handle multiple priorities.",
  ],

  benefits: [
    "Competitive Salary: Based on experience and qualifications.",
    "Health Insurance: Comprehensive medical, dental, and vision coverage.",
    "Retirement Plan: 401(k) plan with company match.",
    "Paid Time Off: 20 days of paid vacation per year + public holidays.",
    "Professional Development: Access to online learning platforms, training, and certifications.",
    "Flexible Work Hours: Work remotely with flexible hours.",
    "Team Building: Regular virtual team-building activities and annual off-site retreats.",
    "Wellness Program: Gym memberships, mental health support, and wellness initiatives.",
    "Work-Life Balance: A supportive environment that prioritizes work-life balance.",
  ],
};

export const SAMPLE_JOBS: ManyJobsProps[] = [
  {
    company_name: "Google Google Google",
    logo: "https://logo.clearbit.com/google.com",
    job_name: "Software Engineer",
    categories: ["engineering", "technology"],
    location: "San Francisco, CA",
    type: "full-time",
    level: "mid-level",
    date_posted: "2025-02-20",
  },
  {
    company_name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    job_name: "Marketing Specialist",
    categories: ["marketing", "advertising"],
    location: "New York, NY",
    type: "full-time",
    level: "entry-level",
    date_posted: "2025-02-18",
  },
  {
    company_name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    job_name: "Data Analyst",
    categories: ["data science", "analytics"],
    location: "Seattle, WA",
    type: "remote",
    level: "mid-level",
    date_posted: "2025-02-17",
  },
  {
    company_name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    job_name: "Electrical Engineer",
    categories: ["engineering", "manufacturing"],
    location: "Austin, TX",
    type: "full-time",
    level: "senior-level",
    date_posted: "2025-02-15",
  },
  {
    company_name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    job_name: "Product Manager",
    categories: ["product management", "technology"],
    location: "Menlo Park, CA",
    type: "hybrid",
    level: "mid-level",
    date_posted: "2025-02-14",
  },
  {
    company_name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    job_name: "UI/UX Designer",
    categories: ["design", "creative"],
    location: "Los Angeles, CA",
    type: "contract",
    level: "entry-level",
    date_posted: "2025-02-12",
  },
  {
    company_name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    job_name: "Backend Developer",
    categories: ["software development", "technology"],
    location: "Stockholm, Sweden",
    type: "full-time",
    level: "mid-level",
    date_posted: "2025-02-10",
  },
  {
    company_name: "Airbnb",
    logo: "https://logo.clearbit.com/airbnb.com",
    job_name: "Customer Support Representative",
    categories: ["customer service", "operations"],
    location: "Remote",
    type: "part-time",
    level: "entry-level",
    date_posted: "2025-02-08",
  },
  {
    company_name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    job_name: "Cybersecurity Analyst",
    categories: ["security", "technology"],
    location: "San Jose, CA",
    type: "full-time",
    level: "senior-level",
    date_posted: "2025-02-05",
  },
];

export const SAMPLE_TOP_COMPANIES: TopCompaniesProps[] = [
  {
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
  },
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialProps[] = [
  {
    name: "Olivia Adams",
    role: "Software Engineer",
    message:
      "JobVana made my job search so much easier! I applied to multiple companies, tracked my applications, and landed my dream role in just a few weeks!",
    image: "/images/olivia.jpg",
  },
  {
    name: "James Carter",
    role: "Marketing Specialist",
    message:
      "I was struggling to find the right job until I found JobVana. The platform is user-friendly, and I love how I can save jobs and apply later!",
    image: "/images/james.jpg",
  },
  {
    name: "Sophia Lee",
    role: "HR Manager",
    message:
      "As an employer, JobVana has helped us find top talent effortlessly. Posting jobs and reviewing applications has never been this smooth!",
    image: "/images/sophia.jpg",
  },
  {
    name: "Daniel Ochieng",
    role: "Data Analyst",
    message:
      "Thanks to JobVana, I received multiple job offers and secured a role that perfectly matches my skills. Highly recommended!",
    image: "/images/daniel.jpg",
  },
];

export const SAMPLE_FAQS: FAQSProps[] = [
  {
    category: "Job Seekers",
    questions: [
      {
        question: "How do I apply for a job on JobVana?",
        answer:
          "To apply for a job, browse listings, select a job, and click 'Apply.' You may need to upload your resume and fill out additional application details.",
      },
      {
        question: "Can I save jobs and apply later?",
        answer:
          "Yes! Click 'Save' on a job listing, and you can apply from your saved jobs section whenever you're ready.",
      },
      {
        question: "How can I track my job applications?",
        answer:
          "Once you apply, track your application status in your dashboard with updates like Pending, Under Review, or Accepted.",
      },
      {
        question: "Is JobVana free for job seekers?",
        answer:
          "Yes! JobVana is completely free for job seekers to browse and apply for jobs.",
      },
      {
        question: "How do I get notified about new job postings?",
        answer:
          "Subscribe to job alerts based on your preferences, and we'll notify you via email when new jobs match your interests.",
      },
    ],
  },
  {
    category: "Employers",
    questions: [
      {
        question: "How do I post a job on JobVana?",
        answer:
          "Sign up as an employer, go to your dashboard, click 'Post a Job,' and fill in the job details before publishing.",
      },
      {
        question: "How do I receive applications?",
        answer:
          "Candidate applications appear in your dashboard, where you can review resumes, shortlist candidates, and contact them directly.",
      },
      {
        question: "Can I edit or delete a job post?",
        answer:
          "Yes, job posts can be edited or removed at any time from your employer dashboard.",
      },
      {
        question: "How much does it cost to post a job?",
        answer:
          "We offer free and premium job posting options. Premium postings have higher visibility. Contact our sales team for pricing details.",
      },
      {
        question: "Can I promote my job postings?",
        answer:
          "Yes! You can boost job posts for more visibility and reach more qualified candidates. Contact us for advertising options.",
      },
    ],
  },
  {
    category: "General Questions",
    questions: [
      {
        question: "How do I create an account on JobVana?",
        answer:
          "Click 'Sign Up,' select 'Job Seeker' or 'Employer,' fill in your details, and verify your email to get started.",
      },
      {
        question: "How secure is my data on JobVana?",
        answer:
          "We prioritize security. Your personal information is encrypted and never shared without your consent.",
      },
      {
        question: "Who can I contact for support?",
        answer:
          "If you need help, contact our support team at support@jobvana.com.",
      },
    ],
  },
];

export const SAMPLE_TEAM_MEMBERS: TeamMembersProps[] = [
  {
    name: "Lina Chen",
    role: "Frontend Developer",
    image: "/images/sophia.jpg",
    description:
      "Lina is a software engineer specializing in frontend development with React and Next.js.",
  },
  {
    name: "Nicholas Mbali",
    role: "Backend Developer",
    image: "/images/daniel.jpg",
    description:
      "Aisha is a full-stack developer with expertise in Node.js, Express, and database management.",
  },
  {
    name: "Michael Carter",
    role: "Product Manager",
    image: "/images/james.jpg",
    description:
      "Michael is a product manager ensuring JobVana's features meet user needs efficiently.",
  },
  {
    name: "Sophia Williams",
    role: "UI/UX Designer",
    image: "/images/olivia.jpg",
    description:
      "Sophia is a UX/UI designer crafting intuitive and visually appealing user experiences.",
  },
];
