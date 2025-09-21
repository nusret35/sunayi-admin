"use client";

import MiniLoaderSpinner from "@/components/MiniLoadingSpinner";
import { useAuth } from "@/redux/hooks";
import { hydrateAuthState } from "@/util/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HeaderRightButtonGroup = () => {
  const { isLoggedIn, isHydrated } = useAuth();
  const pathUrl = usePathname();

  useEffect(() => {
    // Hydrate auth state on app mount
    hydrateAuthState();
  }, []);

  if (!isHydrated) {
    return <MiniLoaderSpinner />;
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="flex gap-x-10">
          <Link
            href="/panel"
            className={`hover:text-primary cursor-pointer ${pathUrl === "/panel" ? "text-primary" : ""}`}
          >
            Panel
          </Link>
          <Link
            href="/hesap"
            className={`hover:text-primary cursor-pointer ${pathUrl === "/hesap" ? "text-primary" : ""}`}
          >
            Hesap
          </Link>
          <Link
            href="/sepet"
            className={`hover:text-primary cursor-pointer ${pathUrl === "/sepet" ? "text-primary" : ""}`}
          >
            Sepet
          </Link>
        </div>
      ) : (
        <Link
          href="/giris/hesap-giris"
          className="bg-primary text-regular hover:bg-primaryho flex items-center justify-center rounded-full px-7.5 py-2.5 text-white duration-300 ease-in-out"
        >
          Giriş Yap
        </Link>
      )}
    </>
  );
};

export default HeaderRightButtonGroup;
