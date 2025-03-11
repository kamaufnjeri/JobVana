import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { clearCookiesAndRedirect, setCookies } from "../authUtils";

const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jobvana-backend.onrender.com/api/jobs/";

interface DecodedToken {
  exp: number;
}

let isRefreshing = false;
let refreshTokenPromise: Promise<string | undefined> | null = null;  // Ensure return type matches expected type

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let accessToken: string | undefined = Cookies.get("accessToken") || undefined; // Convert null to undefined
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken && typeof accessToken === "string" && accessToken.includes(".")) {
      try {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const isTokenExpired = decoded.exp < Date.now() / 1000;

        if (isTokenExpired && refreshToken) {
          if (isRefreshing) {
            accessToken = await refreshTokenPromise || undefined;  // Convert null to undefined
          } else {
            isRefreshing = true;
            refreshTokenPromise = (async () => {
              try {
                const response: AxiosResponse<{ access: string; refresh: string }> =
                  await axios.post(`${baseURL}auth/token/refresh/`, { refresh: refreshToken });

                setCookies(response.data.refresh, response.data.access);
                isRefreshing = false;
                return response.data.access;
              } catch (err) {
                isRefreshing = false;
                toast.error("Session expired. Please log in again.");
                clearCookiesAndRedirect();
                return undefined;  // Ensure a valid return type
              }
            })();
            accessToken = await refreshTokenPromise || undefined;
          }
        }

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          if (!(config.data instanceof FormData)) {
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

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can handle specific errors like 401 here if needed
    return Promise.reject(error);
  }
);

export default api;


