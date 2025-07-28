import { functionToCreateOrder } from "@/API/api";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRazorpay } from "react-razorpay";

export const PaymentDemo = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
 
  const amount = 500;


  const handlePayment = async () => {
    const dat = await toCreateOrder();
   await  setOrder(dat);
    console.log(order);
    const options = {
      key: "rzp_test_n4AxeVBg1w6Rqk",
      amount: 500 * 100,
      name: "Test App",
      description: "Test Transaction",
      order_id: order?.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Manpreet",
        email: "manpreet@example.com",
        contact: "9999999999",
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Button onClick={handlePayment}>Pay ₹500</Button>
    </>
  );
};
