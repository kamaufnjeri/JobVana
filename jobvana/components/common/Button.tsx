import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ name, styles, children, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`flex flex-row gap-2 items-center justify-center ${styles}`}
    >
      {name && <h5 className="text-h5">{name}</h5>}
      {children}

    </button>
  );
};

export default Button;
