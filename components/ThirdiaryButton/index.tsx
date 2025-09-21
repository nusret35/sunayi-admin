import { ReactNode } from "react";

const ThirdiaryButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="dark:bg-btndark text-primary cursor-pointer rounded-lg p-3"
    >
      {children}
    </button>
  );
};

export default ThirdiaryButton;
