export type BillingFormValues = {
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  address: string;
  nationalId: string;
  companyName: string;
  taxNumber: string;
  taxOffice: string;
};

export type AddressFormValues = {
  city: string;
  district: string;
  postalCode: string;
  address: string;
  street: string;
};

export interface AddNewAddressFormValues extends AddressFormValues {
  addressName: string;
}
