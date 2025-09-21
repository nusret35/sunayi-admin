"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GoBackButton = () => {
  const searchParams = useSearchParams();
  return (
    <Link
      href={
        searchParams?.get("geri-don")
          ? `/${searchParams?.get("geri-don")}`
          : "/panel"
      }
      className="text-primary mb-5 rounded-lg text-sm"
    >
      ← Geri git
    </Link>
  );
};

export default GoBackButton;
