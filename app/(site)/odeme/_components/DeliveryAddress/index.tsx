"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/PrimaryButton";
import {
  AddressFormValues,
  BillingFormValues,
} from "@/types/checkoutFormValues";
import SecondaryButton from "@/components/SecondaryButton";

const deliveryAddressSchema = Yup.object({
  city: Yup.string().required("Şehir zorunludur."),
  district: Yup.string().required("İlçe zorunludur."),
  street: Yup.string().required("Sokak/Mahalle zorunludur."),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "5 haneli posta kodu giriniz.")
    .required("Posta kodu zorunludur."),
  address: Yup.string().required("Adres zorunludur."),
});

const DeliveryAddress = ({
  deliveryAddressInfo,
  billingInfo,
  billingAddressCheckbox,
  onGoBack,
  onSubmit,
}: {
  deliveryAddressInfo?: AddressFormValues;
  billingInfo?: BillingFormValues;
  billingAddressCheckbox: boolean;
  onGoBack: () => void;
  onSubmit: (values: AddressFormValues) => void;
}) => {
  const getInitialValues = (): AddressFormValues => {
    if (billingAddressCheckbox && billingInfo) {
      return {
        city: billingInfo.city || "",
        district: billingInfo.district || "",
        postalCode: billingInfo.postalCode || "",
        address: billingInfo.address || "",
        street: billingInfo.street || "",
      };
    }

    if (deliveryAddressInfo) {
      return deliveryAddressInfo;
    }

    return {
      city: "",
      district: "",
      postalCode: "",
      address: "",
      street: "",
    };
  };

  const formik = useFormik<AddressFormValues>({
    initialValues: getInitialValues(),
    validationSchema: deliveryAddressSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const formData = {
        city: formik.values.city,
        district: formik.values.district,
        postalCode: formik.values.postalCode,
        address: formik.values.address,
      };

      const hasValues = Object.values(formData).some(
        (value) => value && value.trim() !== "",
      );
      if (hasValues && !billingAddressCheckbox) {
        sessionStorage.setItem(
          "checkout-delivery-address",
          JSON.stringify(formData),
        );
      }
    }
  }, [formik.values, billingAddressCheckbox]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
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
          {formik.touched.city && formik.errors.city && (
            <p className="text-sm text-red-600">
              {formik.errors.city as string}
            </p>
          )}
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
          {formik.touched.district && formik.errors.district && (
            <p className="text-sm text-red-600">
              {formik.errors.district as string}
            </p>
          )}
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
          {formik.touched.street && formik.errors.street && (
            <p className="text-sm text-red-600">
              {formik.errors.street as string}
            </p>
          )}
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
            className={`w-full rounded border px-3 py-2 dark:bg-gray-800`}
          />
          {formik.touched.postalCode && formik.errors.postalCode && (
            <p className="text-sm text-red-600">
              {formik.errors.postalCode as string}
            </p>
          )}
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
          <p className="text-sm text-red-600">
            {formik.errors.address as string}
          </p>
        )}
      </div>

      <div className="flex gap-x-2">
        <SecondaryButton className="w-28" onClick={() => onGoBack()}>
          Geri
        </SecondaryButton>
        <PrimaryButton className="w-36" type="submit">
          Devam Et
        </PrimaryButton>
      </div>
    </form>
  );
};

export default DeliveryAddress;
