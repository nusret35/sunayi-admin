"use client";

import React, { useEffect } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import {
  BillingFormValues,
  AddressFormValues,
} from "@/types/checkoutFormValues";
import { CreditCardFormValues } from "../CreditCardForm";
import { Building2, MapPin, CreditCard } from "lucide-react";

const FinalOverview = ({
  billingInfo,
  deliveryAddressInfo,
  creditCardInfo,
  onGoBack,
  onConfirm,
}: {
  billingInfo: BillingFormValues;
  deliveryAddressInfo: AddressFormValues;
  creditCardInfo?: CreditCardFormValues;
  onGoBack: () => void;
  onConfirm: () => void;
}) => {
  const maskCardNumber = (cardNumber: string) =>
    `**** **** **** ${cardNumber.slice(-4)}`;

  useEffect(() => {
    if (!creditCardInfo) {
      onGoBack();
    }
  }, [creditCardInfo]);

  const Section = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="dark:border-strokedark rounded-xl border bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
        {icon}
        <span>{title}</span>
      </div>
      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Section title="Fatura Bilgileri" icon={<Building2 size={18} />}>
        <p>
          Ad Soyad / Firma:
          {` ${billingInfo.name} ${billingInfo.surname}` ||
            billingInfo.companyName}
        </p>
        <p>Vergi No: {billingInfo.taxNumber || "-"}</p>
        <p>Vergi Dairesi: {billingInfo.taxOffice || "-"}</p>
        <p>Adres: {billingInfo.address}</p>
        <p>
          İl / İlçe: {billingInfo.city} / {billingInfo.district}
        </p>
        <p>Posta Kodu: {billingInfo.postalCode}</p>
      </Section>

      <Section title="Teslimat Adresi" icon={<MapPin size={18} />}>
        <p>Adres: {deliveryAddressInfo.address}</p>
        <p>
          İl / İlçe: {deliveryAddressInfo.city} / {deliveryAddressInfo.district}
        </p>
        <p>Posta Kodu: {deliveryAddressInfo.postalCode}</p>
      </Section>

      {creditCardInfo && (
        <Section title="Ödeme Bilgileri" icon={<CreditCard size={18} />}>
          <p>Kart Sahibi: {creditCardInfo.cardHolderName}</p>
          <p>Kart Numarası: {maskCardNumber(creditCardInfo.cardNumber)}</p>
          <p>Son Kullanma Tarihi: {creditCardInfo.expiryDate}</p>
        </Section>
      )}

      <div className="mt-6 flex justify-end gap-x-4">
        <SecondaryButton className="w-28" onClick={onGoBack}>
          Geri
        </SecondaryButton>
        <PrimaryButton className="w-36" type="button" onClick={onConfirm}>
          Siparişi Onayla
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FinalOverview;
