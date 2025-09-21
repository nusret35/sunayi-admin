import { Material } from "./material";
import { NextProcess } from "./nextProcess";
import OrderStatus from "./orderStatus";

export type Post = {
  id: string;
  displayId: string;
  quantity: number;
  material: Material;
  nextProcess: NextProcess;
  name: string;
  amount: number;
  status: OrderStatus;
  cost: number;
  actionRequired: boolean;
  extraRequirements: string;
};

export interface SheetMetalFormingPost extends Post {
  toleranceValue: string;
  tappingAndCounterSkinning: number;
  thumbnailImageUrl: string;
  documentUrl: string;
}

export interface SheetMetalCuttingPost extends Post {
  thumbnailImageUrl: string;
  sketchDocumentUrl: string;
  sheetThickness: number;
  partMarking: string;
}

export interface SheetMetalPost extends Post {
  width: number;
  height: number;
  length: number;
}
