import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "@/interfaces";
import { useState } from "react";
import PostJobModal from "../jobs/PostJobModal";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openPostJobModal, setOpenPostJobModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 max-w-screen">
      {openPostJobModal && <PostJobModal closeModal={() => setOpenPostJobModal(false)}/>}
      <Header openPostJobModal={() => setOpenPostJobModal(true)}/>
      <main className="min-h-screen">{children}</main>
      <Footer openPostJobModal={() => setOpenPostJobModal(true)}/>
    </div>
  );
}

export default Layout;