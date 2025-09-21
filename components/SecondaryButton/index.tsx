import { ReactNode } from "react";

const SecondaryButton = ({
  onClick,
  children,
  className,
  disabled = false,
  type = "button",
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`text-primary rounded-lg bg-gray-100 p-2 transition-colors duration-200 ${
        disabled
          ? "cursor-not-allowed text-gray-400 opacity-50"
          : "cursor-pointer hover:bg-gray-200 active:bg-gray-300"
      } ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
