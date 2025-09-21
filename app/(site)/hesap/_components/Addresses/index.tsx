"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddNewAddressFormValues } from "@/types/checkoutFormValues";
import NewAddressForm from "../NewAddressForm";
import {
  useAddAddressMutation,
  useGetUserAddressesQuery,
  useUpdateAddressMutation,
} from "@/redux/services/addressApi";
import Skeleton from "./Skeleton";
import { Address, AddressRequest, UpdateAddressRequest } from "@/types/address";
import { toast } from "react-toastify";
import AddressButton from "./AddressButton";
import UpdateAddressForm from "../UpdateAddressForm";

const Addresses = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const { data, isLoading, isSuccess } = useGetUserAddressesQuery();
  const [
    addAddress,
    {
      isLoading: isAddAddressLoading,
      isSuccess: isAddAddressSuccess,
      isError: isAddAddressError,
    },
  ] = useAddAddressMutation();
  const [
    updateAddress,
    { isLoading: isLoadingUpdateAddres, isSuccess: isSuccessUpdateAddress },
  ] = useUpdateAddressMutation();

  const handleCancel = () => {
    setShowAddForm(false);
  };

  const handleSave = (values: AddNewAddressFormValues) => {
    const newAddress: AddressRequest = {
      addressName: values.addressName,
      city: values.city,
      district: values.district,
      country: "Turkey",
      street: values.street,
      address: values.address,
      postalCode: values.postalCode,
    };
    addAddress(newAddress);
  };

  const handleUpdate = (values: Address) => {
    if (!selectedAddress?.id) {
      toast.error("Adres güncellenemedi", { position: "bottom-right" });
      return;
    }
    const addressToBeUpdated: UpdateAddressRequest = {
      id: selectedAddress?.id,
      addressName: values.addressName,
      city: values.city,
      district: values.district,
      country: "Turkey",
      street: values.street,
      address: values.address,
      postalCode: values.postalCode,
    };
    updateAddress(addressToBeUpdated);
  };

  useEffect(() => {
    if (isAddAddressSuccess) {
      toast.success("Adres eklendi", { position: "bottom-right" });
      setShowAddForm(false);
    }

    if (isAddAddressError) {
      toast.error("Adres eklenemedi", { position: "bottom-right" });
    }

    if (isSuccessUpdateAddress) {
      toast.success("Adres güncellendi", { position: "bottom-right" });
    }
  }, [isAddAddressSuccess, isAddAddressError, isSuccessUpdateAddress]);

  return (
    <div className="dark:border-strokedark dark:bg-blacksection z-40 col-span-3 flex h-full rounded-lg border border-white bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_-4px_12px_rgba(0,0,0,0.06)] lg:h-[580px]">
      <div className="w-full">
        {selectedAddress ? (
          <UpdateAddressForm
            address={selectedAddress}
            isLoading={isLoadingUpdateAddres}
            onGoBack={() => setSelectedAddress(undefined)}
            onSubmit={handleUpdate}
          />
        ) : !showAddForm ? (
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Adreslerim
              </h3>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Plus size={16} />
                Adres Ekle
              </button>
            </div>

            {isLoading ? (
              <Skeleton />
            ) : data && data.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Henüz kayıtlı adresiniz bulunmamaktadır.
                </p>
              </div>
            ) : (
              <div className="flex-1 space-y-4 overflow-y-auto">
                {data &&
                  data.map((address) => (
                    <AddressButton
                      key={address.id}
                      address={address}
                      onClick={() => setSelectedAddress(address)}
                    />
                  ))}
              </div>
            )}
          </div>
        ) : (
          <NewAddressForm onSubmit={handleSave} onGoBack={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default Addresses;
