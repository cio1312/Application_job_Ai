import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [orderId, setOrderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setError(""); // Reset any previous errors

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          setError("You must log in to make a payment.");
          alert("Please login first");
          navigate("/login");
          return;
        }

        const userId = user.adminId;
        setUserId(userId);

        const response = await axios.get(
          `http://localhost:8080/api/jobs/check-payment/${userId}`
        );
        setOrderId(response.data.orderID || null);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setError("Failed to retrieve payment information. Please try again.");
      }
    };

    fetchOrder();
  }, [navigate]);

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <h2>Complete Your Payment</h2>
        <p>Pay to access premium courses.</p>

        {error && <p className="error-message">{error}</p>}

        <PayPalScriptProvider
          options={{
            "client-id": "AVj_EU01wwIAryboRe-wkpHE0mh9dTuaFthGuYtikViexoC7_XBoWOX5nwjeCcHL-KWBYJtKhYvN3BQg",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [{ amount: { value: "22.2" } }],
                })
                .then((orderID) => {
                  console.log("✅ PayPal Order Created:", orderID);
                  setOrderId(orderID);
                  return orderID;
                })
                .catch((err) => {
                  console.error("❌ Error creating PayPal order:", err);
                  setError("Error creating order. Please refresh and try again.");
                });
            }}
            onApprove={async (data, actions) => {
              try {
                console.log("✅ Payment Approved:", data);
                const details = await actions.order.capture();
                const paymentId = details.id;
                alert("🎉 Payment Successful!");

                const storedUser = JSON.parse(localStorage.getItem("user"));
                const userId = storedUser?.adminId;

                if (!userId) {
                  setError("User ID is missing. Cannot confirm payment.");
                  console.error("❌ User ID missing.");
                  return;
                }

                console.log("🔵 Sending Payment Confirmation to Backend:");
                console.log("User ID:", userId);
                console.log("Order ID:", data.orderID);
                console.log("Payment ID:", paymentId);

                // ✅ Send confirmation request to backend
                const response = await axios.post(
                  `http://localhost:8080/api/jobs/confirm-payment/${userId}`,
                  { orderId: data.orderID, paymentId },
                  { headers: { "Content-Type": "application/json" } }
                );

                console.log("✅ Backend Response:", response.data);

                // ✅ Redirect user to courses page after successful payment
                navigate("/courses");
              } catch (error) {
                console.error("❌ Error confirming payment:", error);
                setError("Payment successful, but an error occurred while confirming.");
              }
            }}
            onError={(err) => {
              console.error("❌ PayPal Payment failed:", err);
              setError("Payment failed. Please try again.");
              alert("Payment failed. Please try again.");
            }}
          />
        </PayPalScriptProvider>
      </div>

      {/* ✅ Inline CSS for styling */}
      <style>
        {`
          .payment-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: calc(100vh - 120px); 
            padding: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
          }

          .payment-container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 100%;
            max-width: 500px;
          }

          h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #333;
          }

          p {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: #555;
          }

          .paypal-buttons {
            width: 100%;
            max-width: 400px;
          }

          .error-message {
            color: red;
            font-size: 1rem;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Payment;
