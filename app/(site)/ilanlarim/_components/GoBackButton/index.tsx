"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const GoBackButton = ({ goBackPath }: { goBackPath?: string }) => {
  const searchParams = useSearchParams();
  return (
    <Link href={"/"} className="text-primary mb-5 rounded-lg text-sm">
      ← Geri git
    </Link>
  );
};

export default GoBackButton;
