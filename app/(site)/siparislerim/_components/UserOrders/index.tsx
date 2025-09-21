"use client";

import LoaderSpinner from "@/components/LoaderSpinner";
import { useLazyGetAllOrdersQuery } from "@/redux/services/orderApi";
import Order from "@/types/order";
import { useEffect, useRef, useState } from "react";

import OrderEntry from "../OrderEntry";

const UserOrders = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [getOrders, { isLoading }] = useLazyGetAllOrdersQuery();
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    getOrders(pageNo)
      .unwrap()
      .then((response) => {
        setOrders((prevPosts) => [...prevPosts, ...response]);
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
          setPageNo((prev) => prev + 1);
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
  }, [hasMoreData, isLoading]);

  return (
    <div>
      {orders.map((post, index) => (
        <div key={index} className="mb-4">
          <OrderEntry entry={post} />
        </div>
      ))}
      <div className="flex justify-center">
        {isLoading && <LoaderSpinner />}
      </div>
      <div ref={bottomRef} style={{ height: "1px" }} />
    </div>
  );
};

export default UserOrders;
