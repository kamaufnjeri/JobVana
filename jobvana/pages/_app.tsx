import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import { NotificationProvider } from "@/context/NotificationProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <NotificationProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </AuthProvider>
      </NotificationProvider>
    </LocationProvider>
  );
}
