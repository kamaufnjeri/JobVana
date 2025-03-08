import Link from "next/link";
import { FaBars, FaBell } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import NotificationsContainer from "../dashboard/NotificationsContainer";
import { useNotifications } from "@/context/NotificationProvider";


const Header: React.FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { unreadCount } = useNotifications();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const { toggleShowNotifications} = useNotifications();



 

  return (
    <header className="text-text flex flex-col lg:flex-row items-center lg:justify-between w-full  min-h-20 border-b-2 border-borderColor gap-2 z-10">
      {user && <NotificationsContainer/>}
      <div className="flex items-center justify-between gap-4 w-full lg:w-1/3 lg:px-10 md:px-5 px-2 pt-5">
        <Link
          prefetch={true}
          href="/"
          className={`text-h1 opacity-100 hover:opacity-80 transition-class`}
        >
          JobVana
        </Link>

        <FaBars
          onClick={toggleDropDown}
          className="hover:text-primary text-h4 lg:hidden transition-class"
        />
      </div>
      <nav
        className={` flex-col gap-2 lg:px-10 md:px-5 px-2 py-2 lg:flex-row lg:items-center items-start lg:justify-between lg:w-2/3 w-full md:smooth-dropdown sm:smooth-dropdown lg:flex transition-all duration-300 ease-out ${
          isDropDownOpen
            ? "max-h-96 opacity-100 lg:opacity-100"
            : "max-h-0 opacity-0 lg:opacity-100"
        }`}
      >
        <ul className="flex flex-col gap-2 lg:flex-row lg:items-center items-start lg:gap-4 lg:w-3/4">
          <li>
            <Link
              prefetch={true}
              href="/"
              className={`${
                pathname === "/" ? "text-primary" : "text-text"
              } text-h4 hover:text-primary transition-class`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              prefetch={true}
              href="/jobs"
              className={`${
                pathname === "/jobs" ? "text-primary" : "text-text"
              } text-h4 hover:text-primary transition-class`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              prefetch={true}
              href="/about"
              className={`${
                pathname === "/about" ? "text-primary" : "text-text"
              } text-h4 hover:text-primary transition-class`}
            >
              About
            </Link>
          </li>
          {user && isAuthenticated() ? (
            <>
              <li>
                <Link
                  prefetch={true}
                  href={`/dashboard/${user.role}`}
                  className={`${
                    pathname === "/login" ? "text-primary" : "text-text"
                  } text-h4 hover:text-primary transition-class`}
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  prefetch={true}
                  href="/login"
                  className={`${
                    pathname === "/login" ? "text-primary" : "text-text"
                  } text-h4 hover:text-primary transition-class`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="/sign-up"
                  className={`${
                    pathname === "/sign-up" ? "text-primary" : "text-text"
                  } text-h4 hover:text-primary transition-class`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex gap-2 flex-row lg:items-center items-start justify-between lg:gap-4 lg:mt-0 mt-2 lg:w-1/2">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center items-start justify-center">
         

          {user && (
          <div className="flex  p-2 items-start text-gray-900 cursor-pointer gap-2 flex-col relative group">
          {/* Hover dropdown */}
          <div className="p-1 hidden group-hover:flex flex-col gap-2 items-start absolute lg:left-0 lg:top-14 top-0 left-14 z-50 bg-gray-50 rounded-sm duration-300 transition-all ease-in-out w-[150px] text-center">
            <p className="text-p hover:text-primary">
              {user.first_name} {user.last_name}
            </p>
           
              <button onClick={() => toggleShowNotifications()} className="relative hover:text-primary">
              <FaBell className="text-2xl "/>
              {unreadCount > -1 && <p className="rounded-full text-white h-6 text-center w-6 bg-red-600 font-bold absolute -top-2 -right-2">{unreadCount}</p>}

              </button>
        
            <span className=" flex justify-center" onClick={logout}>
              <MdLogout className="text-2xl hover:text-primary" />
            </span>
          </div>
        
          {/* Avatar */}
          <span className="rounded-full w-10 h-10 group-hover:ring-4 ring-primary flex items-center justify-center flex-row gap-2">
            <Image
              src={`https://ui-avatars.com/api/?name=${user.first_name} ${user.last_name}&size=50`}
              alt={user.first_name}
              width={50}
              height={50}
              className="rounded-full"
            />
          </span>
        </div>
        
          )}
           {(!user || user.role === "employer") && (
            <>
              <Link
               prefetch={true}
               href={user ? `/dashboard/post-a-job` : 'login'}
               className={`${
                 pathname === "/post-a-job" ? "opacity-80" : "text-text"
               } bg-primary p-2 h-10 rounded-md text-center text-h5 hover:opacity-80 opacity-100 text-white`}
               
               
              >Post a Job</Link>
            </>
          )}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
