import axios, { AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { clearCookiesAndRedirect, setCookies } from "../authUtils";

// Get backend URL from .env file
const baseURL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

// Interface for decoded token
interface DecodedToken {
  exp: number;
}

// Global variable to track if refresh token request is in progress
let isRefreshing = false;
let refreshTokenPromise: Promise<void> | null = null;

// Creating an Axios instance
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add refresh or access token if needed
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken && typeof accessToken === "string" && accessToken.includes(".")) {
      try {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const isTokenExpired = decoded.exp < Date.now() / 1000;

        if (isTokenExpired && refreshToken) {
          // Prevent multiple refresh requests
          if (isRefreshing) {
            // If a refresh request is already in progress, we need to wait for it
            await refreshTokenPromise;
            accessToken = Cookies.get("accessToken") || accessToken; // Get new access token if available
          } else {
            isRefreshing = true;
            refreshTokenPromise = new Promise<void>(async (resolve, reject) => {
              try {
                const response: AxiosResponse<{ access: string; refresh: string }> =
                  await axios.post(`${baseURL}auth/token/refresh/`, { refresh: refreshToken });

                setCookies(response.data.refresh, response.data.access);
                accessToken = response.data.access;
                isRefreshing = false;
                resolve();
              } catch (err) {
                toast.error("Session expired. Please log in again.");
                clearCookiesAndRedirect();
                isRefreshing = false;
                reject(err);
              }
            });
            await refreshTokenPromise;
          }
        }

        // Attach the access token to the request header
        if (accessToken) {
          config.headers = new AxiosHeaders({
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          });
        }
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

// Response interceptor (if you want to add any additional response handling)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can handle specific errors like 401 here if needed
    return Promise.reject(error);
  }
);

export default api;
