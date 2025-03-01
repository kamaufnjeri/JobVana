import Link from "next/link";
import { FaBars } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Button from "../common/Button";


interface HeaderProps {
  openPostJobModal: () => void;
}
const Header: React.FC<HeaderProps> = ({ openPostJobModal}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const pathname = usePathname();
  const [loggedin, setLoggedin] = useState<boolean>(true);

  const toggleDropDown = () => {

    setIsDropDownOpen(!isDropDownOpen);
  };

  const router = useRouter();

    const goToPostJob = () => {
      console.log(loggedin)
      if (loggedin) {
        openPostJobModal();
      } else {
        router.push('/login');
      }
    }

 

  return (
    <header className="text-text flex flex-col lg:flex-row items-center lg:justify-between w-full  min-h-20 border-b-2 border-borderColor gap-2 z-10">
      <div className="flex items-center justify-between gap-4 w-full lg:w-1/3 lg:px-10 md:px-5 px-2 pt-5">
        <Link href="/" className={`text-h1 opacity-100 hover:opacity-80 transition-class`}>
          JobVana
        </Link>

        <FaBars
          onClick={toggleDropDown}
          className="hover:text-primary text-h4 lg:hidden transition-class"
        />
      </div>
      <nav
        className={` flex-col gap-2 lg:px-10 md:px-5 px-2 py-2 lg:flex-row lg:items-center items-start lg:justify-between lg:w-2/3 w-full md:smooth-dropdown sm:smooth-dropdown lg:flex transition-all duration-300 ease-out ${
          isDropDownOpen ? "max-h-96 opacity-100 lg:opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
        }`}
      >
        <ul className="flex flex-col gap-2 lg:flex-row lg:items-center items-start lg:gap-4 lg:w-2/3">
          <li>
            <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-text'} text-h4 hover:text-primary transition-class`}>
             Home
            </Link>
          </li>
          <li>
            <Link href="/jobs" className={`${pathname === '/jobs' ? 'text-primary' : 'text-text'} text-h4 hover:text-primary transition-class`}>
             Jobs
            </Link>
          </li>
          <li>
            <Link href="/about" className={`${pathname === '/about' ? 'text-primary' : 'text-text'} text-h4 hover:text-primary transition-class`}>
             About
            </Link>
          </li>
          <li>
            <Link href="/login" className={`${pathname === '/login' ? 'text-primary' : 'text-text'} text-h4 hover:text-primary transition-class`}>
             Login
            </Link>
          </li>
          <li>
            <Link href="/sign-up" className={`${pathname === '/login' ? 'text-primary' : 'text-text'} text-h4 hover:text-primary transition-class`}>
             Sign Up
            </Link>
          </li>
          
        </ul>
        <div className="flex gap-2 flex-row lg:items-center items-start justify-between lg:gap-4 lg:mt-0 mt-2 lg:w-1/3">
          <Button
          name='Post a Job'
          onClick={goToPostJob}
            styles="bg-primary p-2 rounded-md text-center text-h5 hover:opacity-80 opacity-100 text-white"
          />
         
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
