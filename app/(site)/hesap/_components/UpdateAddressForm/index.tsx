"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/PrimaryButton";
import { AddNewAddressFormValues } from "@/types/checkoutFormValues";
import SecondaryButton from "@/components/SecondaryButton";
import { Address } from "@/types/address";
import MiniLoaderSpinner from "@/components/MiniLoadingSpinner";
import ThirdiaryButton from "@/components/ThirdiaryButton";
import { useSetDefaultAddressMutation } from "@/redux/services/addressApi";
import { toast } from "react-toastify";

const deliveryAddressSchema = Yup.object({
  addressName: Yup.string().required("Adres ismi zorunludur."),
  city: Yup.string().required("Şehir zorunludur."),
  district: Yup.string().required("İlçe zorunludur."),
  street: Yup.string().required("Sokak/Mahalle zorunludur."),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "5 haneli posta kodu giriniz.")
    .required("Posta kodu zorunludur."),
  address: Yup.string().required("Adres zorunludur."),
});

const UpdateAddressForm = ({
  address,
  isLoading,
  onGoBack,
  onSubmit,
}: {
  address: Address;
  isLoading: boolean;
  onGoBack: () => void;
  onSubmit: (values: AddNewAddressFormValues) => void;
}) => {
  const [isDefault, setIsDefault] = useState(address.isDefault);
  const [setDefaultAddress, { isSuccess, isLoading: isLoadingUpdateAddres }] =
    useSetDefaultAddressMutation();

  const initialValues = {
    addressName: address.addressName,
    city: address.city,
    district: address.district,
    postalCode: address.postalCode,
    address: address.address,
    street: address.street,
    country: "Turkey",
  };

  const formik = useFormik<AddNewAddressFormValues>({
    initialValues: initialValues,
    validationSchema: deliveryAddressSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsDefault(true);
      toast.success("Adres güncellendi", { position: "bottom-right" });
    }
  }, [isSuccess]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-1">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Adres İsmi
        </label>
        <input
          name="addressName"
          value={formik.values.addressName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
        />

        <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
          {formik.touched.addressName && (formik.errors.addressName as string)}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Şehir
          </label>
          <input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
          />

          <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
            {formik.touched.city && (formik.errors.city as string)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            İlçe
          </label>
          <input
            name="district"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
          />

          <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
            {formik.touched.district && (formik.errors.district as string)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Sokak/Mahalle
          </label>
          <input
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
          />
          <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
            {formik.touched.street && (formik.errors.street as string)}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Posta Kodu
          </label>
          <input
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Örn: 34000"
            className={`w-full rounded border px-3 py-2`}
          />
          <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
            {formik.touched.postalCode && (formik.errors.postalCode as string)}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Açık Adres
        </label>
        <textarea
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
          rows={3}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="mt-1 min-h-[1.25rem] text-sm text-red-600">
            {formik.errors.address as string}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <ThirdiaryButton onClick={onGoBack}>Geri</ThirdiaryButton>
        <SecondaryButton
          disabled={isDefault}
          onClick={() => setDefaultAddress({ id: address.id })}
        >
          {isLoadingUpdateAddres ? (
            <MiniLoaderSpinner />
          ) : isDefault ? (
            "Varsayılan"
          ) : (
            "Varsayılan Olarak Seç"
          )}
        </SecondaryButton>
        <PrimaryButton type="submit">
          {isLoading ? <MiniLoaderSpinner /> : "Güncelle"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default UpdateAddressForm;
