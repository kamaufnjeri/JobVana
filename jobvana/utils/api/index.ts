import axios, { AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { clearCookiesAndRedirect, setCookies } from "../authUtils";


// get backend-url fron .env file
const baseURL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL


// interface for decoded token
interface DecodedToken {
    exp: number;
}

// creating an axios instance
const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
})

// request interceptor to add refresh or access token if needed

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");


    if (accessToken && typeof accessToken === "string" && accessToken.includes(".")) {
      try {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const isTokenExpired = decoded.exp < Date.now() / 1000;

        if (isTokenExpired) {
          if (refreshToken) {
            try {
              const response: AxiosResponse<{ access: string; refresh: string }> =
                await axios.post(`${baseURL}/auth/refresh/`, { refresh: refreshToken });

              setCookies(response.data.refresh, response.data.access);
              accessToken = response.data.access;
            } catch (err) {
              toast.error("Session expired. Please log in again.");
              clearCookiesAndRedirect();
              return Promise.reject(err);
            }
          } else {
            toast.error("Session expired. Please log in again.");
            clearCookiesAndRedirect();
            return Promise.reject(new Error("No refresh token available"));
          }
        }

        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        });

      } catch (decodeError) {
        console.error("JWT Decode Error:", decodeError);
        toast.error("Invalid session. Please log in again.");
        clearCookiesAndRedirect();
        return Promise.reject(decodeError);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// Response interceptor to catch 401 errors
const allowedUnauthRoutes = ["/jobs", "/auth/*, /jobs/seaarch"]; // Add allowed routes

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
   
    return Promise.reject(error);
  });

  export default api