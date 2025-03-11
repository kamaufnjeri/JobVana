import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { clearCookiesAndRedirect, setCookies } from "../authUtils";

// backend api url
const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jobvana-backend.onrender.com/api/jobs/";

// interface for decode token
interface DecodedToken {
  exp: number;
}

let isRefreshing = false; 
let refreshTokenPromise: Promise<string | undefined> | null = null;  

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let accessToken: string | undefined = Cookies.get("accessToken") || undefined; 
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken && typeof accessToken === "string" && accessToken.includes(".")) {
      // if access token
      try {
        const decoded: DecodedToken = jwtDecode(accessToken); // decoded token
        const isTokenExpired = decoded.exp < Date.now() / 1000; // check if expired

        if (isTokenExpired && refreshToken) {
          // if access token and expired
          if (isRefreshing) {
            accessToken = await refreshTokenPromise || undefined;  
          } else {
            isRefreshing = true;
            refreshTokenPromise = (async () => {
              try {
                const response: AxiosResponse<{ access: string; refresh: string }> =
                  await axios.post(`${baseURL}auth/token/refresh/`, { refresh: refreshToken });
                  // refresh token and set tokens
                setCookies(response.data.refresh, response.data.access);
                isRefreshing = false;
                return response.data.access;
              } catch (err) {
                isRefreshing = false;
                toast.error("Session expired. Please log in again.");
                clearCookiesAndRedirect();
                return undefined;  
              }
            })();
            accessToken = await refreshTokenPromise || undefined;
          }
        }

        if (accessToken) {
          // ste headers i.e bearer tokens
          config.headers.Authorization = `Bearer ${accessToken}`;
          if (!(config.data instanceof FormData)) {
            // if not form data set to application/json
            config.headers["Content-Type"] = "application/json";
          } else {
            config.headers["Content-Type"] = "multipart/form-data";
          }
        }
        
        return config;
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

// for response
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


