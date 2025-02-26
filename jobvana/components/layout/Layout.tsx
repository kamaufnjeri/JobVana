import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "@/interfaces";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 w-screen">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;