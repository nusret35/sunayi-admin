"use client";

import { Combobox } from "@/components/Combobox";
import Link from "next/link";
import { useState } from "react";

const MetalSheet = () => {
  const units = ["mm", "cm", "m"];
  const [widthUnit, setWidthUnit] = useState<string | undefined>("mm");
  const [lengthUnit, setLengthUnit] = useState<string | undefined>("mm");
  const [heightUnit, setHeightUnit] = useState<string | undefined>("mm");

  return (
    <div>
      <div>
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full flex-col">
            <span className="text-sm">Kalite:</span>
            <Combobox
              data={[]}
              placeholder="Kalite seç"
              searchPlaceholder="Malzeme ara..."
              selected={""}
              setValue={() => {}}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Kalınlık:</span>
            <div className="flex">
              <input
                value={1}
                className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-full rounded-lg border p-1 focus:outline-hidden md:w-24 dark:bg-black dark:shadow-none"
                onChange={(event) => {
                  const newValue = Math.max(
                    1,
                    parseInt(event.target.value, 10),
                  );
                  //setQuantity(newValue.toString());
                }}
              />
              <div className="w-[120px]">
                <Combobox
                  data={units}
                  selected={lengthUnit}
                  placeholder="Birim seç"
                  setValue={setLengthUnit}
                  searchPlaceholder="Birim ara"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Genişlik:</span>
            <div className="flex">
              <input
                value={1}
                className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-full rounded-lg border p-1 focus:outline-hidden md:w-24 dark:bg-black dark:shadow-none"
                onChange={(event) => {
                  const newValue = Math.max(
                    1,
                    parseInt(event.target.value, 10),
                  );
                  //setQuantity(newValue.toString());
                }}
              />
              <div className="w-[120px]">
                <Combobox
                  data={units}
                  selected={widthUnit}
                  placeholder="Birim seç"
                  setValue={setWidthUnit}
                  searchPlaceholder="Birim ara"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Uzunluk:</span>
            <div className="flex">
              <input
                value={1}
                onChange={(event) => {
                  const newValue = Math.max(
                    1,
                    parseInt(event.target.value, 10),
                  );
                  //setQuantity(newValue.toString());
                }}
                className="border-stroke focus:border-primary dark:border-strokedark dark:focus:border-primary mr-2 w-full rounded-lg border p-1 focus:outline-hidden md:w-24 dark:bg-black dark:shadow-none"
              />
              <div className="w-[120px]">
                <Combobox
                  data={units}
                  selected={heightUnit}
                  placeholder="Birim seç"
                  setValue={setHeightUnit}
                  searchPlaceholder="Birim ara"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex w-full md:justify-end">
        <Link
          href="/giris/hesap-giris"
          className="bg-primary md:text-regular hover:bg-primaryho flex w-full items-center justify-center rounded-lg px-7.5 py-2.5 text-sm text-white duration-300 ease-in-out md:w-36"
        >
          Devam Et
        </Link>
      </div>
    </div>
  );
};

export default MetalSheet;
