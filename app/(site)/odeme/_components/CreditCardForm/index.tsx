"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

export interface CreditCardFormValues {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const creditCardSchema = Yup.object({
  cardHolderName: Yup.string().required("Kart üzerindeki isim zorunludur."),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "16 haneli kart numarası giriniz.")
    .required("Kart numarası zorunludur."),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Ay/Yıl formatında giriniz (MM/YY).")
    .required("Son kullanma tarihi zorunludur."),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "3 haneli CVV giriniz.")
    .required("CVV zorunludur."),
});

const CreditCardForm = ({
  creditCardInfo,
  onGoBack,
  onSubmit,
}: {
  creditCardInfo?: CreditCardFormValues;
  onGoBack: () => void;
  onSubmit: (values: CreditCardFormValues) => void;
}) => {
  const formik = useFormik<CreditCardFormValues>({
    initialValues: creditCardInfo
      ? creditCardInfo
      : {
          cardHolderName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        },
    validationSchema: creditCardSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Kart Üzerindeki İsim
        </label>
        <input
          name="cardHolderName"
          value={formik.values.cardHolderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
        />
        {formik.touched.cardHolderName && formik.errors.cardHolderName && (
          <p className="text-sm text-red-600">{formik.errors.cardHolderName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Kart Numarası
        </label>
        <input
          name="cardNumber"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="1234567812345678"
          maxLength={16}
          inputMode="numeric"
          className="w-full rounded border px-3 py-2 dark:bg-gray-800"
        />
        {formik.touched.cardNumber && formik.errors.cardNumber && (
          <p className="text-sm text-red-600">{formik.errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Son Kullanma Tarihi
          </label>
          <input
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="MM/YY"
            maxLength={5}
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <p className="text-sm text-red-600">{formik.errors.expiryDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            CVV
          </label>
          <input
            name="cvv"
            type="password"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={3}
            className="w-full rounded border px-3 py-2 dark:bg-gray-800"
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <p className="text-sm text-red-600">{formik.errors.cvv}</p>
          )}
        </div>
      </div>

      <div className="flex gap-x-2">
        <SecondaryButton className="w-28" onClick={onGoBack}>
          Geri
        </SecondaryButton>
        <PrimaryButton className="w-36" type="submit">
          Devam Et
        </PrimaryButton>
      </div>
    </form>
  );
};

export default CreditCardForm;
