import Cookies from "js-cookie";


// clearing cookies
export const clearCookiesAndRedirect = () => {
  // Remove cookies
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  // Check if the user is on a protected route (starts with "/dashboard")
  if (window.location.pathname.startsWith("/dashboard")) {
    window.location.href = "/login"; // Redirect to login page
  }
};

// setting cookies
export const setCookies = ( refreshToken: string, accessToken: string) => {
    Cookies.set('accessToken', accessToken, { expires: 1, path: '/' });
    Cookies.set('refreshToken', refreshToken, { expires: 2, path: '/' });
}

export const validatePassword = (
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const errors: string[] = [];

  if (password.length < 8) errors.push("Password must be at least 8 characters long.");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
  if (!/\d/.test(password)) errors.push("Password must contain at least one number.");
  if (!/[@$!%*?&]/.test(password)) errors.push("Password must contain at least one special character (@$!%*?&).");

 return errors.length === 0 ? "" : setError(errors.join("\n")); // Return a formatted error message
};
