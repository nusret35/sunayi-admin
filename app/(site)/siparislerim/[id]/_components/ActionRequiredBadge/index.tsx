import StatusBadge from "@/components/StatusBadge";

const ActionRequiredBadge = () => {
  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 capitalize md:text-sm dark:bg-red-900 dark:text-red-200">
      Aksiyon Gerekli
    </span>
  );
};

export default ActionRequiredBadge;
