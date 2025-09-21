interface UploadFileResponse {
  id: string;
  quantity: number;
  cost: number;
  createdAt: null;
  updatedAt: null;
  material: {
    id: number;
    value: string;
  };
  nextProcess: {};
  extraRequirements: "";
  thumbnailImageUrl: string;
  sketchDocumentUrl: string;
  sheetThickness: number;
  partMarking: string;
}

export default UploadFileResponse;
