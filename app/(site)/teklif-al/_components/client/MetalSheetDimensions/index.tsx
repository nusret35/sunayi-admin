"use client";

const MetalSheetDimensions = () => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex flex-col">
        <span className="text-sm">Kalınlık:</span>
        <div>
          <input
            value={1}
            onChange={(event) => {
              const newValue = Math.max(1, parseInt(event.target.value, 10));
              //setQuantity(newValue.toString());
            }}
            className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-20 rounded-lg border p-1 focus:outline-hidden dark:bg-black dark:shadow-none"
          />
          <span>mm</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">Genişlik:</span>
        <div>
          <input
            value={1}
            onChange={(event) => {
              const newValue = Math.max(1, parseInt(event.target.value, 10));
              //setQuantity(newValue.toString());
            }}
            className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-20 rounded-lg border p-1 focus:outline-hidden dark:bg-black dark:shadow-none"
          />
          <span>mm</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm">Uzunluk:</span>
        <div>
          <input
            value={1}
            onChange={(event) => {
              const newValue = Math.max(1, parseInt(event.target.value, 10));
              //setQuantity(newValue.toString());
            }}
            className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-20 rounded-lg border p-1 focus:outline-hidden dark:bg-black dark:shadow-none"
          />
          <span>mm</span>
        </div>
      </div>
    </div>
  );
};

export default MetalSheetDimensions;
