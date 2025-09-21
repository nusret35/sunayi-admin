import React from "react";

const BasketLoadingSkeleton = () => {
  return (
    <section className="relative mx-4 py-20 lg:py-25 xl:py-30 2xl:px-0">
      <div className="max-w-c-1390 mx-auto mt-8 grid w-full grid-cols-1 gap-4 lg:grid-cols-8">
        {/* Main Content Area */}
        <div className="lg:col-span-5">
          <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection w-full rounded-lg border border-white bg-white p-8 transition-all">
            {/* Header buttons skeleton */}
            <div className="flex animate-pulse justify-end">
              <div className="mr-2 h-12 w-32 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-12 w-24 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Basket items skeleton */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="my-4 animate-pulse">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-800">
                  {/* Product image and info */}
                  <div className="flex items-start space-x-4">
                    <div className="h-20 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>

                  {/* Product details */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-3">
          <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark sticky top-26 h-fit rounded-lg border border-white bg-white p-8 transition-all">
            <div className="animate-pulse">
              {/* Title */}
              <div className="mb-5 h-7 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>

              {/* Quantity and price */}
              <div className="mb-5 flex justify-between">
                <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Shipping cost */}
              <div className="flex justify-between">
                <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Divider */}
              <div className="my-4 h-[0.1px] w-full bg-gray-200 dark:bg-gray-600"></div>

              {/* Info box */}
              <div className="mb-8 h-24 w-full rounded-xl bg-gray-100 dark:bg-gray-700"></div>

              {/* Complete order button */}
              <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasketLoadingSkeleton;
