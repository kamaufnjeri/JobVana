import axios, { AxiosError } from 'axios';
import { capitalizeWords } from '.';

interface ErrorResponse {
  response?: {
    data: {
      details?: string[] | { [key: string]: string };
    };
  };
  message?: string;
}

export const handleApiError = (error: unknown): string => {
  let errorMessage: string = "Unknown Error";

  // Check if it's an AxiosError and handle it accordingly
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.data) {
      // Access the details or fallback to the full data
      const errorData = (axiosError.response.data as { details?: string[] | { [key: string]: string } }).details || axiosError.response.data;

      if (Array.isArray(errorData)) {
        errorMessage = errorData.join("\n");
      } else if (typeof errorData === "object") {
        // Assuming it's an object with string values
        errorMessage = Object.entries(errorData)
        .map(([key, value]) => 
          key === "non_field_errors" ? `${value}` : `${capitalizeWords(key)} - ${value}`
        )
        .join("\n")
  
      } else {
        // Fallback to a string
        errorMessage = String(errorData);
      }
    } else if (axiosError.message) {
      errorMessage = axiosError.message;
    }
  } else if (error instanceof Error) {
    // Handle non-Axios errors, e.g., JavaScript Errors
    errorMessage = error.message;
  } else {
    // Fallback if the error is not AxiosError or a standard Error
    errorMessage = "An unknown error occurred";
  }

  return errorMessage;
};
