export const getMetadataByTypeName = (type?: string) => {
  switch (type) {
    case "cnc_processing":
      return "CNC İşleme";
    case "iron_steel_product":
      return "Demir Çelik Ürünleri";
    case "sheet_metal_cutting":
      return "Sac Metal Kesim";
    case "sheet_metal_forming":
      return "Sac Metal Şekillendirme";
    case "sheet_metal":
      return "Sac Levha";
    default:
      return "Ürün";
  }
};
