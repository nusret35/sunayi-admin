"use client";

import CogWheel from "@/app/assets/icons/CogWheel";
import { useUploadFileMutation } from "@/redux/services/postApi";
import { FileUploader } from "react-drag-drop-files";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/LoaderSpinner";

const UploadProjectComponent = () => {
  const fileTypes = ["dxf", "pdf", "jpg", "png"];
  const router = useRouter();
  const [uploadFile, { data, error, isLoading, isSuccess }] =
    useUploadFileMutation();

  const handleChange = async (file) => {
    if (file) {
      await uploadFile(file);
    }
  };

  useEffect(() => {
    if (data) {
      router.push(`/urun/${data.id}?sepeteEkle=true`);
    }
  }, [data]);

  return (
    <div className="flex w-full">
      <FileUploader
        handleChange={handleChange}
        name="file"
        classes="w-full"
        types={fileTypes}
      >
        {isLoading || isSuccess ? (
          <div className="flex w-full items-center justify-center">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12 transition-all hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
            <CogWheel />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Çizim dosyanızı sürükleyip bırakın, ya da{" "}
              <span className="text-blue-500 underline">seçin</span>
            </p>
            <p className="text-sgray-400 mt-1 text-xs dark:text-gray-500">
              Desteklenen formatlar: {fileTypes.join(", ")}
            </p>
          </div>
        )}
      </FileUploader>
    </div>
  );
};

export default UploadProjectComponent;
