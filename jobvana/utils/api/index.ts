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
    headers: { "Content-Type": "application/json" }
})

// request interceptor to add refresh or access token if needed

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>  => {
        // get access and refresh tokens from session storage
      /* let accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken"); */

    let accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
  
      if (accessToken) {
        // if access token decode to check if expired
        const decoded: DecodedToken = jwtDecode(accessToken);
        const isTokenExpired = decoded.exp < Date.now() / 1000;
  
        if (isTokenExpired) {
            if (refreshToken) {
                try {
                    // if expired and refresh token get access and refresh token from backend api
                    const response: AxiosResponse<{ access: string; refresh: string }> =
                      await axios.post(`${baseURL}/auth/refresh/`, { refresh: refreshToken });
                    // store in session storage
                   /*  sessionStorage.setItem("accessToken", response.data.access);
                    sessionStorage.setItem("refreshToken", response.data.refresh); */

                    // store access and refresh tokens in cookies
                   setCookies(response.data.refresh, response.data.access)
                    accessToken = response.data.access;
                  } catch (err) {
                    // in case of an error redirect user to login and clear session storage or cookies
                    toast.error("Please log in again.");
                    /*                 
                 sessionStorage.clear();
 */ 
                    clearCookiesAndRedirect();
                    return Promise.reject(err);
                  }
            } else {
                 // in case of no refresh token redirect user to login and clear session storage or cookies
                 toast.error("Please log in again.");
/*                 
                 sessionStorage.clear();
 */                 
                clearCookiesAndRedirect();
            }
          
        }
  
        // setting headers with bearer authorization and content-typ
        config.headers = new AxiosHeaders({
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });
    }

    return config;
},
(error) => Promise.reject(error)
);


// Response interceptor to catch 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      // in case of 401 error token redirect user to login and clear session storage or cookies
      toast.error("Session expired. Please log in again.");
      /*                 
                       sessionStorage.clear();
       */                 
                      clearCookiesAndRedirect();
    }
    return Promise.reject(error);
  }
);

export default api;