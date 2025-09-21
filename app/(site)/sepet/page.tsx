import { Metadata } from "next";
import BasketComponentClient from "./_components/page";

export const metadata: Metadata = {
  title: "Sepet - Sunayi",

  description: "This is Blog page for Solid Pro",
};

const BasketPage = () => {
  return <BasketComponentClient />;
};

export default BasketPage;
