import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import MetalSheet from "../client/MetalSheet";
import UploadProjectComponent from "../client/UploadProjectComponent";

const MakeOffer = () => {
  return (
    <section className="mx-4 overflow-hidden py-20 md:flex lg:py-25 xl:py-30 2xl:px-0">
      <div className="max-w-c-1390 relative mx-auto mt-8 w-full gap-4 lg:flex">
        <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection z-40 w-full items-center rounded-lg border border-white bg-white p-8 transition-all md:flex-1">
          <Tabs defaultValue="sac-kesim-cnc-isleme">
            <TabsList className="mb-8 flex w-full flex-wrap md:mb-0">
              <TabsTrigger
                className="data-[state=active]:border-b-primary cursor-pointer rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                value="sac-kesim-cnc-isleme"
              >
                Sac Kesim ve CNC İşleme
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-primary cursor-pointer rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                value="sac-levha"
              >
                Sac Levha
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-primary cursor-pointer rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                value="demir-celik-urunleri"
              >
                Demir Çelik Ürünleri
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-primary cursor-pointer rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                value="insaat-demirleri"
              >
                İnşaat Demirleri
              </TabsTrigger>
            </TabsList>

            <TabsContent className="mx-20" value="sac-kesim-cnc-isleme">
              <div>
                <h3 className="dxl:text-itemtitle my-5 text-xl text-black dark:text-white">
                  Projeni Yükle ve Hemen Teklif Al
                </h3>
                <UploadProjectComponent />
              </div>
            </TabsContent>
            <TabsContent className="md:mx-20" value="sac-levha">
              <div>
                <h3 className="dxl:text-itemtitle my-5 text-xl text-black dark:text-white">
                  İstediğin Ebatları Gir ve Hemen Teklif Al
                </h3>
                <div className="w-full items-center justify-center gap-x-4 md:flex">
                  <div className="flex w-full justify-center md:hidden">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <div className="hidden md:block">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <MetalSheet />
                </div>
              </div>
            </TabsContent>
            <TabsContent className="md:mx-20" value="demir-celik-urunleri">
              <div>
                <h3 className="dxl:text-itemtitle my-5 text-xl text-black dark:text-white">
                  İstediğin Ebatları Gir ve Hemen Teklif Al
                </h3>
                <div className="w-full items-center justify-center gap-x-4 md:flex">
                  <div className="flex w-full justify-center md:hidden">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <div className="hidden md:block">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <MetalSheet />
                </div>
              </div>
            </TabsContent>
            <TabsContent className="md:mx-20" value="insaat-demirleri">
              <div>
                <h3 className="dxl:text-itemtitle my-5 text-xl text-black dark:text-white">
                  İstediğin Ebatları Gir ve Hemen Teklif Al
                </h3>
                <div className="w-full items-center justify-center gap-x-4 md:flex">
                  <div className="flex w-full justify-center md:hidden">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <div className="hidden md:block">
                    <Image
                      alt="square"
                      className="h-full w-52"
                      src="/images/upload/square.jpg"
                      height={20}
                      width={300}
                    />
                  </div>
                  <MetalSheet />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MakeOffer;
