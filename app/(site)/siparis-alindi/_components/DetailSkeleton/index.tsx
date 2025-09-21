import React from "react";

const SimpleOrderDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default SimpleOrderDetailSkeleton;
