import { Metadata } from "next";
import MakeOffer from "./_components/server";

export const metadata: Metadata = {
  title: "Teklif Al - Sunayi",
  description:
    "Sac Kesim ve CNC İşleme - Sac Levha - Demir Çelik Ürünleri - İnşaat Demirleri",
};

function MakeOfferPage() {
  return <MakeOffer />;
}

export default MakeOfferPage;
