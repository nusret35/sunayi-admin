"use client";

import LoaderSpinner from "@/components/LoaderSpinner";
import PrimaryButton from "@/components/PrimaryButton";
import { useAddToBasketMutation } from "@/redux/services/basketApi";
import { useLazyGetPostsQuery } from "@/redux/services/postApi";
import GetPostResponse from "@/types/getPostResponse";
import { SheetMetalCuttingPost } from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";

const PostEntry = ({ entry }: { entry: GetPostResponse }) => {
  const post = entry.post as SheetMetalCuttingPost;
  const [addToBasket, { isLoading, isSuccess }] = useAddToBasketMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ürün eklendi", { position: "bottom-right" });
      router.push("/sepet");
    }
  }, [isSuccess]);

  return (
    <div className="dark:border-strokedark rounded-xl border bg-white p-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        {/* Image Section */}
        <div className="flex flex-shrink-0 justify-center lg:justify-start">
          <img
            src={post.thumbnailImageUrl}
            alt="DXF Drawing"
            className="h-auto w-full max-w-[180px] rounded-lg object-cover lg:w-[180px]"
          />
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Post Details */}
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 text-[14px]">
              <h4 className="text-lg font-bold text-black dark:text-white">
                {entry.post.displayId}
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Üretim tipi:
                </h4>
                <h4 className="text-gray-600 dark:text-gray-300">
                  {entry.type}
                </h4>
              </div>

              <div className="flex gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Boyutlar:
                </h4>
                <h4 className="text-gray-600 dark:text-gray-300">
                  {1}mm x {1}mm x {1}mm
                </h4>
              </div>

              <div className="flex gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Saç kalınlığı:
                </h4>
                <h4 className="text-gray-600 dark:text-gray-300">4 mm</h4>
              </div>

              <div className="flex gap-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Malzeme:
                </h4>
                <h4 className="text-gray-600 dark:text-gray-300">-</h4>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex h-full flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-end lg:justify-end xl:flex-row">
            {/* Main Action Buttons */}
            <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row">
              <Link
                href={`/urun/${post.id}?duzenle=1`}
                className="dark:bg-btndark text-primary cursor-pointer rounded-lg bg-gray-100 p-3 text-center whitespace-nowrap transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600"
              >
                Düzenle
              </Link>
              <PrimaryButton
                disabled={isLoading}
                onClick={() => addToBasket({ postId: post.id })}
              >
                Sepete Ekle
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserPosts = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [getPosts, { isLoading }] = useLazyGetPostsQuery();
  const [posts, setPosts] = useState<GetPostResponse[]>([]);
  const [pageNo, setPageNo] = useState(0);

  const debouncedLoadNextPage = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setPageNo((prev) => prev + 1);
    }, 300);
  }, []);

  useEffect(() => {
    getPosts(pageNo)
      .unwrap()
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, ...response]);
        if (response.length < 10) {
          setHasMoreData(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
      });
  }, [pageNo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMoreData && !isLoading) {
          debouncedLoadNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentBottomRef = bottomRef.current;
    if (currentBottomRef) {
      observer.observe(currentBottomRef);
    }

    return () => {
      if (currentBottomRef) {
        observer.unobserve(currentBottomRef);
      }
    };
  }, [hasMoreData, isLoading, debouncedLoadNextPage]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="mb-4">
          <PostEntry entry={post} />
        </div>
      ))}
      <div className="flex justify-center">
        {isLoading && <LoaderSpinner />}
      </div>
      <div ref={bottomRef} style={{ height: "1px" }} />
    </div>
  );
};

export default UserPosts;
