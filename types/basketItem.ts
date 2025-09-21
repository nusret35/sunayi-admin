interface BasketItem {
  id: string;
  post: {
    id: string;
    displayId: string;
    quantity: 1;
    cost: 1.0;
    createdAt: string;
    updatedAt: string;
    material: {
      id: number;
      value: string;
    };
    nextProcess: {};
    extraRequirements: string;
    thumbnailImageUrl: string;
    sketchDocumentUrl: string;
    sheetThickness: number;
    partMarking: string;
    discriminatorValue: string;
  };
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
