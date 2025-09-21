import ProductDetails from "../_components/client/ProductDetails";
import { Metadata } from "next";
import { getMetadataByTypeName } from "@/util/helper";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`)
    .then((res) => res.json())
    .catch(() => undefined);

  if (response) {
    return { title: `${getMetadataByTypeName(response.type)} - Sunayi` };
  }
  return { title: "Ürün - Sunayi" };
}

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1016 mx-auto mt-15 grid grid-cols-1 gap-4 px-4 md:px-8 lg:grid-cols-4 xl:mt-20 xl:px-0">
          <div className="col-span-1 lg:col-span-4">
            <h1 className="mb-8 text-3xl font-semibold text-black dark:text-white">
              Ürünü düzenle
            </h1>
            <ProductDetails id={id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
