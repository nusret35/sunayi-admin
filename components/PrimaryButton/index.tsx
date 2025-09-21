import { ReactNode } from "react";

const PrimaryButton = ({
  onClick,
  type,
  disabled,
  children,
  className,
}: {
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${disabled ? "cursor-none" : "cursor-pointer"} rounded-lg p-2 text-white transition-colors duration-200 ${disabled ? "bg-gray-400" : "bg-primary hover:bg-blue-600 active:bg-blue-700"} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
