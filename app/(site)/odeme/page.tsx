"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BillingInformation from "./_components/BillingInformation";
import {
  AddressFormValues,
  BillingFormValues,
} from "@/types/checkoutFormValues";
import DeliveryAddress from "./_components/DeliveryAddress";
import PaymentInformation from "./_components/PaymentInformation";
import { CreditCardFormValues } from "./_components/CreditCardForm";
import FinalOverview from "./_components/CheckoutOverview";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm font-medium text-black dark:text-white">
              {step}
            </span>
            {index !== steps.length - 1 && (
              <div className="h-0.5 w-6 bg-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const savedStep = sessionStorage.getItem("checkout-current-step");
      return savedStep ? parseInt(savedStep, 10) : 0;
    }
    return 0;
  });

  const [billingInfo, setBillingInfo] = useState<BillingFormValues>(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const sessionBillingInfo = sessionStorage.getItem(
        "checkout-billing-info",
      );
      if (sessionBillingInfo) {
        return JSON.parse(sessionBillingInfo);
      }
    }
    return undefined;
  });

  const [deliveryAddressInfo, setDeliveryAddressInfo] =
    useState<AddressFormValues>(() => {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const sessionDeliveryAddressInfo = sessionStorage.getItem(
          "checkout-delivery-address",
        );
        if (sessionDeliveryAddressInfo) {
          return JSON.parse(sessionDeliveryAddressInfo);
        }
      }
    });

  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardFormValues>();
  const steps = ["Fatura Bilgileri", "Teslimat Adresi", "Ödeme", "Ön İzleme"];
  const [billingAddressCheckbox, setBillingAddressCheckbox] =
    useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("checkout-current-step", currentStep.toString());
    }
  }, [currentStep]);

  const clearCheckoutProgress = () => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.removeItem("checkout-current-step");
    }
  };

  useEffect(() => {
    if (!creditCardInfo && currentStep === 3) {
      setCurrentStep(2);
      sessionStorage.setItem("checkout-current-step", "2");
    }
  }, []);

  const renderCurrentSection = (step: number) => {
    if (step === 0) {
      return (
        <BillingInformation
          initialValues={billingInfo}
          setBillingAddressCheckbox={setBillingAddressCheckbox}
          onSubmit={(values) => {
            sessionStorage.setItem(
              "checkout-billing-info",
              JSON.stringify(values),
            );
            setBillingInfo(values);
            setCurrentStep(1);
          }}
        />
      );
    } else if (step === 1) {
      return (
        <DeliveryAddress
          deliveryAddressInfo={deliveryAddressInfo}
          billingInfo={billingInfo}
          billingAddressCheckbox={billingAddressCheckbox}
          onGoBack={() => setCurrentStep(0)}
          onSubmit={(values) => {
            sessionStorage.setItem(
              "checkout-delivery-address",
              JSON.stringify(values),
            );
            setDeliveryAddressInfo(values);
            setCurrentStep(2);
          }}
        />
      );
    } else if (step === 2) {
      return (
        <PaymentInformation
          creditCardInfo={creditCardInfo}
          onGoBack={() => setCurrentStep(1)}
          onSubmit={(values) => {
            setCreditCardInfo(values);
            setCurrentStep(3);
          }}
        />
      );
    } else if (step === 3) {
      return (
        <FinalOverview
          billingInfo={billingInfo}
          deliveryAddressInfo={deliveryAddressInfo}
          creditCardInfo={creditCardInfo}
          onGoBack={() => setCurrentStep(2)}
          onConfirm={() => {
            // 🔒 Finalize order logic goes here (e.g. API call)
            clearCheckoutProgress();
            alert("Siparişiniz başarıyla alındı!");
          }}
        />
      );
    }
    return null;
  };

  return (
    <section className="mx-4 overflow-hidden py-20 md:flex lg:py-25 xl:py-30 2xl:px-0">
      <div className="max-w-c-1390 relative mx-auto mt-8 w-full gap-4 lg:flex">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection z-40 flex-[5] items-center rounded-lg border border-white bg-white p-8 transition-all"
        >
          <StepIndicator steps={steps} currentStep={currentStep} />
          {renderCurrentSection(currentStep)}
        </motion.div>
        <div className="flex-[3]">
          <div className="shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark sticky h-fit rounded-lg border border-white bg-white p-8 transition-all">
            <h3 className="dxl:text-itemtitle mb-5 text-xl font-semibold text-black dark:text-white">
              Sepet Özeti
            </h3>
            <div className="flex justify-between"></div>
            <div className="flex justify-between">
              <h4 className="text-sm text-black dark:text-white">
                Kargo ücreti
              </h4>
            </div>
            <div className="my-4 h-[0.1px] w-full bg-gray-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
