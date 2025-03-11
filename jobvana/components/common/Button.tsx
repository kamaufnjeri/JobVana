import { ButtonProps } from "@/interfaces";


const Button: React.FC<ButtonProps> = ({
  name, // button name
  styles, // aditional unique styles to button
  children, // other components like icons to be added to button
  type, // type of button i.e subit or button
  onClick, // click event, function to run on clicking button
  loading, // if loading display spin animation
}) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`flex flex-row gap-2 items-center justify-center ${styles} transition-all ease-in-out duration-300 hover:opacity-80`}
    >
      {loading ? (
        
        <span className="h-6 w-6 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></span>
      ) : (
        <>
          {name && <h5 className="text-h5">{name}</h5>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
