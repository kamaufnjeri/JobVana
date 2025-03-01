import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { LocationProvider } from "@/context/LocationContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LocationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocationProvider>
    </AuthProvider>
  );
}
