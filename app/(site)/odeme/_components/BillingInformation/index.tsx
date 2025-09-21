"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/PrimaryButton";
import { useGetCurrentUserQuery } from "@/redux/services/userApi";
import { Checkbox } from "@/components/ui/checkbox";
import { BillingFormValues } from "@/types/checkoutFormValues";
import SecondaryButton from "@/components/SecondaryButton";
import { useRouter } from "next/navigation";
import { useGetDefaultAddressQuery } from "@/redux/services/addressApi";

const baseSchema = {
  name: Yup.string().required("İsim zorunludur."),
  surname: Yup.string().required("Soyisim zorunludur."),
  phone: Yup.string()
    .matches(
      /^(\+90)?\s?5\d{2}\s?\d{3}\s?\d{4}$/,
      "Geçerli bir telefon numarası girin.",
    )
    .required("Telefon numarası zorunludur."),
  city: Yup.string().required("Şehir zorunludur."),
  district: Yup.string().required("İlçe zorunludur."),
  street: Yup.string().required("Sokak/Mahalle zorunludur."),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "5 haneli posta kodu giriniz.")
    .required("Posta kodu zorunludur."),
  address: Yup.string().required("Adres zorunludur."),
};

const individualSchema = Yup.object({
  ...baseSchema,
  nationalId: Yup.string()
    .matches(/^\d{11}$/, "11 haneli T.C. Kimlik No giriniz.")
    .required("T.C. Kimlik No zorunludur."),
});

const firmSchema = Yup.object({
  ...baseSchema,
  companyName: Yup.string().required("Firma adı zorunludur."),
  taxNumber: Yup.string()
    .matches(/^\d+$/, "Vergi numarası sadece rakamlardan oluşmalıdır.")
    .required("Vergi numarası zorunludur."),
  taxOffice: Yup.string().required("Vergi dairesi zorunludur."),
});

const BillingInformation = ({
  initialValues,
  onSubmit,
  setBillingAddressCheckbox,
}: {
  initialValues?: BillingFormValues;
  onSubmit: (values: BillingFormValues) => void;
  setBillingAddressCheckbox: (value: boolean) => void;
}) => {
  const { data } = useGetCurrentUserQuery();
  const { data: defaultAddressData } = useGetDefaultAddressQuery();
  const [customerType, setCustomerType] = useState<"birey" | "firma">("birey");
  const router = useRouter();

  const formik = useFormik<BillingFormValues>({
    initialValues: initialValues ?? {
      name: data?.name || "",
      surname: data?.surname || "",
      phone: data?.phoneNumber || "",
      city: defaultAddressData?.city || "",
      district: defaultAddressData?.district || "",
      street: defaultAddressData?.street || "",
      postalCode: defaultAddressData?.postalCode || "",
      address: defaultAddressData?.address || "",
      nationalId: "",
      companyName: "",
      taxNumber: "",
      taxOffice: "",
    },
    validationSchema: customerType === "birey" ? individualSchema : firmSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setCustomerType("birey")}
          className={`rounded px-4 py-2 text-sm font-medium ${
            customerType === "birey" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Birey
        </button>
        <button
          type="button"
          onClick={() => setCustomerType("firma")}
          className={`rounded px-4 py-2 text-sm font-medium ${
            customerType === "firma" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Firma
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            İsim
          </label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-600">
              {formik.errors.name as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Soyisim
          </label>
          <input
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          />
          {formik.touched.surname && formik.errors.surname && (
            <p className="text-sm text-red-600">
              {formik.errors.surname as string}
            </p>
          )}
        </div>
      </div>

      {customerType === "birey" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            T.C. Kimlik No
          </label>
          <input
            name="nationalId"
            value={formik.values.nationalId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          />
          {formik.touched.nationalId && formik.errors.nationalId && (
            <p className="text-sm text-red-600">
              {formik.errors.nationalId as string}
            </p>
          )}
        </div>
      )}

      {customerType === "firma" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Firma Adı
            </label>
            <input
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded border px-3 py-2 dark:bg-gray-800"
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-sm text-red-600">
                {formik.errors.companyName as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Vergi No
            </label>
            <input
              name="taxNumber"
              value={formik.values.taxNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded border px-3 py-2 dark:bg-gray-800"
            />
            {formik.touched.taxNumber && formik.errors.taxNumber && (
              <p className="text-sm text-red-600">
                {formik.errors.taxNumber as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Vergi Dairesi
            </label>
            <input
              name="taxOffice"
              value={formik.values.taxOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded border px-3 py-2 dark:bg-gray-800"
            />
            {formik.touched.taxOffice && formik.errors.taxOffice && (
              <p className="text-sm text-red-600">
                {formik.errors.taxOffice as string}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Telefon Numarası
        </label>
        <input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="5XX XXX XXXX"
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-sm text-red-600">
            {formik.errors.phone as string}
          </p>
        )}
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
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
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
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
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
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
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
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
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
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          rows={3}
        />
        {formik.touched.address && formik.errors.address && (
          <p className="text-sm text-red-600">
            {formik.errors.address as string}
          </p>
        )}
      </div>
      <div className="flex items-center">
        <Checkbox
          defaultChecked={true}
          onCheckedChange={(checked) => setBillingAddressCheckbox(!!checked)}
          className="cursor-pointer text-white"
        />
        <span className="ml-2">Fatura adresi ile teslimat adresi aynı</span>
      </div>
      <div className="mt-6 flex gap-x-4">
        <SecondaryButton className="w-28" onClick={() => router.back()}>
          Geri
        </SecondaryButton>
        <PrimaryButton className="w-36" type="submit">
          Devam Et
        </PrimaryButton>
      </div>
    </form>
  );
};

export default BillingInformation;
