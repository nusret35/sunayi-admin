"use client";

import React from "react";
import CreditCardForm, { CreditCardFormValues } from "../CreditCardForm";

const PaymentInformation = ({
  creditCardInfo,
  onGoBack,
  onSubmit,
}: {
  creditCardInfo?: CreditCardFormValues;
  onGoBack: () => void;
  onSubmit: (values: CreditCardFormValues) => void;
}) => {
  return (
    <div>
      <CreditCardForm
        creditCardInfo={creditCardInfo}
        onGoBack={onGoBack}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default PaymentInformation;
