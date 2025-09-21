import { Loader2 } from "lucide-react";

export const Icons = {
  spinner: Loader2,
};

const LoaderSpinner = () => {
  return <Icons.spinner className="text-primary h-16 w-16 animate-spin" />;
};

export default LoaderSpinner;
