import axios from "axios";
import { toast } from "react-toastify";

export const handleApiError = (error: unknown): string => {
  let message = "An unexpected error occurred. Please try again.";

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      message = "Network error! Please check your internet connection.";
    } else {
      const { status, data } = error.response;

      if (status === 400 && typeof data === "object" && data !== null) {
        // If there are multiple field errors
        const errorMessages = Object.entries(data)
          .map(([field, errors]) => {
            if (Array.isArray(errors)) {
              return `${field}: ${errors.join(", ")}`; // Join multiple errors for the same field
            }
            return `${field}: ${errors}`;
          })
          .join(" | "); // Separate errors with a |

        message = errorMessages;
      } else if (status === 401 || status === 403) {
        message = data.detail || "Unauthorized request.";
      } else if (status === 404) {
        message = "The requested resource was not found.";
      } else if (status >= 500) {
        message = "Server error! Please try again later.";
      }
    }
  }

  // Show error message using Toastify
  toast.error(message, { position: "top-right" });

  return message;
};
