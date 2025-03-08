import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "@/interfaces";
import { useAuth } from "@/context/AuthContext";
import Loading from "../common/Loading";
import { useState } from "react";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuth();


  return (
    <div className="flex flex-col gap-2 max-w-screen">
      <Header />
      <main className="min-h-screen">
        {loading ? <Loading styles="h-[400px]" /> :  children }
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
