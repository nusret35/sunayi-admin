"use server";
import { cookies } from "next/headers";

export async function setCookie({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key);
}

export async function deleteCookie({ key }: { key: string }) {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
}
