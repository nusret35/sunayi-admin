"use client";
import { useLogOutUserMutation } from "@/redux/services/nonAuthApi";
import { useAuth } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import { useState } from "react";
import Profile from "../Profile";
import Addresses from "../Addresses";

const SettingsClient = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [logOutUser] = useLogOutUserMutation();
  const { logOutUser: logOutClient } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logOutUser();
    logOutClient();
    router.replace("/");
  };

  const SelectedSectionComponent = () => {
    if (selectedSection === 0) {
      return <Profile />;
    } else if (selectedSection === 1) {
      return <Addresses />;
    }
  };

  const menuItems = [
    { id: 0, label: "Profil" },
    { id: 1, label: "Adresler" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-0">
      <div className="dark:border-strokedark dark:bg-blacksection z-40 flex h-auto flex-col justify-between rounded-lg border border-white bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_-4px_12px_rgba(0,0,0,0.06)] lg:col-span-1 lg:mr-4 lg:h-[580px]">
        <div className="lg:hidden">
          <div className="mb-4 flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedSection === item.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="mt-4 flex flex-col gap-y-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`text-left transition-colors ${
                  selectedSection === item.id
                    ? "text-primary font-medium"
                    : "hover:text-primary text-gray-700"
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden w-full flex-col items-center gap-3 lg:flex lg:flex-col lg:gap-0">
          <PrimaryButton
            className="w-full lg:mb-4 lg:w-full"
            onClick={handleLogout}
          >
            Çıkış Yap
          </PrimaryButton>
          <button className="text-primary flex w-full cursor-pointer items-center justify-center lg:w-auto dark:text-white">
            <span>Hesabı Sil</span>
          </button>
        </div>
      </div>

      <div className="lg:col-span-3">
        <SelectedSectionComponent />
      </div>

      <div className="flex w-full flex-col items-center gap-3 lg:hidden lg:flex-col lg:gap-0">
        <PrimaryButton
          className="w-full lg:mb-4 lg:w-full"
          onClick={handleLogout}
        >
          Çıkış Yap
        </PrimaryButton>
        <button className="text-primary flex w-full cursor-pointer items-center justify-center lg:w-auto dark:text-white">
          <span>Hesabı Sil</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsClient;
