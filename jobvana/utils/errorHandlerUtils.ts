import axios, { AxiosError } from "axios";
import { capitalizeFirstLetter } from ".";

interface DjangoErrorResponse {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: string[] | string | undefined;
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error;
    

    if (axiosError.response) {
      const { data } = axiosError.response.data;

      // Handle Django's common "detail" error response
      if (typeof data === "object" && data !== null) {
        if (data.detail) {
          return data.detail;
        } 

        // Handle form validation errors (field-specific)
        const fieldErrors = Object.entries(data)
          .map(([key, value]) =>
            Array.isArray(value) ? `${capitalizeFirstLetter(key)} - ${value.join(", ")}` : `${capitalizeFirstLetter(key)} - ${value}`
          )
          .join(" | ");

        return fieldErrors || `Error: An unknown error occurred.`;
      }
    } else if (axiosError.request) {
      return "No response from server. Please try again later.";
    } else {
      return `Request error: ${axiosError.message}`;
    }
  }

  // Handle other non-Axios errors
  return error instanceof Error ? error.message : "An unknown error occurred.";
};
