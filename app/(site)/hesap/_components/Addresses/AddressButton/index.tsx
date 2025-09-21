import { Address } from "@/types/address";

const AddressButton = ({
  address,
  onClick,
}: {
  address: Address;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/20 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/10"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
          <svg
            className="h-3 w-3 text-gray-600 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {address.addressName}
        </h3>
        {address.isDefault && (
          <span className="ml-auto rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Varsayılan
          </span>
        )}
      </div>

      {/* Condensed address info */}
      <div className="mb-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex justify-between">
          <span>
            {address.city}, {address.district}
          </span>
          <span>{address.postalCode}</span>
        </div>
        <div className="truncate text-gray-500 dark:text-gray-500">
          {address.street}
        </div>
      </div>
    </div>
  );
};

export default AddressButton;
