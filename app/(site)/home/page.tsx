import { MessagesTable } from "@/components/MessagesTable";
import { PostsTable } from "@/components/PostsTable";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Docs page for Solid Pro",
};

const HomePage = async () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1154 mx-auto mt-15 grid grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <h1 className="col-span-1 flex text-3xl font-semibold text-black lg:col-span-4 dark:text-white">
            Günaydın, Nusret Ali
          </h1>
          <div className="col-span-1 lg:col-span-4">
            <div className="dark:border-strokedark dark:bg-blacksection z-40 rounded-lg border border-white bg-white p-6 shadow-lg">
              <div>
                <div className="flex items-center justify-between py-4 dark:text-white">
                  <h3 className="text-lg">İlanlarım</h3>
                  <Link
                    href="/posts"
                    className="bg-primary rounded-lg p-2 text-sm text-white"
                  >
                    Tüm ilanlarım →
                  </Link>
                </div>
                <PostsTable />
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="dark:border-strokedark dark:bg-blacksection z-40 rounded-lg border border-white bg-white p-6 shadow-lg">
              <div>
                <div className="flex items-center justify-between py-4">
                  <h3 className="text-lg dark:text-white">Mesajlarım</h3>
                  <Link href="/messages" className="text-primary text-sm">
                    Tüm mesajlar
                  </Link>
                </div>
                <MessagesTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
