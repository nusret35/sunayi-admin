export type Address = {
  id: string;
  addressName: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  street: string;
  isDefault: boolean;
};

export type AddressRequest = {
  addressName: string;
  city: string;
  district: string;
  country: string;
  street: string;
  address: string;
  postalCode: string;
};

export type UpdateAddressRequest = {
  id: string;
  addressName: string;
  city: string;
  district: string;
  country: string;
  street: string;
  address: string;
  postalCode: string;
};
