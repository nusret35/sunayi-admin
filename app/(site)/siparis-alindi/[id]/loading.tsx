import React from "react";

const OrderReceivedLoadingSkeleton = () => {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="max-w-c-1016 mx-auto mt-15 grid grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
        <div className="col-span-1 lg:col-span-4">
          <div className="animate-pulse">
            {/* Page title skeleton */}
            <div className="mb-8 h-9 w-64 rounded bg-gray-200 dark:bg-gray-700"></div>

            {/* Order confirmation box */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
              <div className="mb-4 flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>

            {/* Order details section */}
            <div className="space-y-6">
              {/* Order information */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-5 w-36 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>

              {/* Order items */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                <div className="mb-4 h-6 w-28 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 dark:border-gray-700"
                    >
                      <div className="h-16 w-16 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                <div className="mb-4 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-14 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                    <div className="flex justify-between">
                      <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & billing info */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                  <div className="mb-4 h-6 w-28 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                  <div className="mb-4 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-12 w-full rounded-lg bg-gray-200 sm:w-40 dark:bg-gray-700"></div>
                <div className="h-12 w-full rounded-lg bg-gray-200 sm:w-36 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderReceivedLoadingSkeleton;
