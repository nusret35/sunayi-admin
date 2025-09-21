import { MessagesTable } from "@/components/MessagesTable";
import { PostsTable } from "@/components/PostsTable";
import { Metadata } from "next";
import Link from "next/link";
import SettingsClient from "./_components/SettingsClient";

export const metadata: Metadata = {
  title: "Hesap - Sunayi",

  // other metadata
  description: "This is Docs page for Solid Pro",
};

const AccountPage = async () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 grid max-w-[960px] grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <h1 className="col-span-1 flex text-3xl font-semibold text-black lg:col-span-4 dark:text-white">
            Hesap
          </h1>
          <div className="col-span-1 lg:col-span-4">
            <SettingsClient />
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
