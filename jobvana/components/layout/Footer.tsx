import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
    const pathname = usePathname();

  return (
    <div className="w-full border-borderColor border-t-2 lg:px-10 md:px-5 px-2 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-text">
      <div className="flex flex-col gap-2 p-2">
        <h1 className="text-h1">Jobvana</h1>
        <h5 className="text-h5">
        Your ultimate destination for job success!
        </h5>
        <p className="text-p readable text-justify">
          JobVana is a comprehensive platform that connects job seekers with
          exciting career opportunities and helps companies post jobs to attract
          top talent. With an intuitive interface and powerful search features,
          JobVana streamlines the hiring process for both professionals and
          employers.
        </p>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h4 className="text-h4">
        Quick Links
        </h4>
        <ul className="flex flex-col gap-2 items-start justify-between w-full">
          <li className="border-text w-full border-b">
            <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             Home
            </Link>
          </li>
          <li className="border-text w-full border-b">
            <Link href="/jobs" className={`${pathname === '/jobs' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             Jobs
            </Link>
          </li>
          <li className="border-text w-full border-b">
            <Link href="/about" className={`${pathname === '/about' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             About
            </Link>
          </li>
          <li className="border-text w-full border-b">
            <Link href="/login" className={`${pathname === '/login' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             Login
            </Link>
          </li>
          <li className="border-text w-full border-b">
            <Link href="/sign-up" className={`${pathname === '/login' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             Sign Up
            </Link>
          </li>
         
          <li className="border-text w-full border-b">
            <Link href="/post-job" className={`${pathname === '/post-job' ? 'text-primary' : 'text-text'} text-h5 hover:text-primary transition-class`}>
             Post a Job
            </Link>
          </li>
        </ul>
        </div>
      <div className="flex flex-col gap-4 p-2">
        <h4 className="text-h4">
        Contact Us
        </h4>

        <div className="flex flex-row gap-4">
            <Link href='https://www.facebook.com' target="_blank"   rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-secondary"/>
            </Link>
            <Link href='https://www.twitter.com' target="_blank"   rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-secondary"/>
            </Link>
            <Link href='https://www.linkedin.com' target="_blank"   rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-secondary"/>
            </Link>
        </div>
        <div className="flex gap-2 flex-col">
            <span className="flex flex-row gap-2 items-center">
                <FaPhone />
                <p>+254712345678</p>
            </span>
            <span className="flex flex-row gap-2 items-center">
                <FaEnvelope/>
                <p>jobvana@gmail.com</p>
            </span>
        </div>
        </div>
      <div className="lg:col-span-3 place-self-center">
        <p className="small-text text-small">
          &copy; JobVana 2025. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
