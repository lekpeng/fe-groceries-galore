import { Box, Button, Grid, Typography } from "@mui/material";
import CreditCard from "./CreditCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import useStateValue from "../../../hooks/useStateValue";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmPaymentDialog from "./ConfirmPaymentDialog";

function SavedCards({ clientSecret, paymentMethods }) {
  const navigate = useNavigate();
  const [{ cart }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState(null);

  const defaultCardsSelectionStatuses = new Array(paymentMethods.length - 1).fill(false);
  defaultCardsSelectionStatuses.unshift(true);

  const [cardsSelectionStatuses, setCardsSelectionStatuses] = useState(defaultCardsSelectionStatuses);

  const [confirmCard, setConfirmCard] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const makePayment = async () => {
      setProcessing(true);
      try {
        if (!clientSecret) {
          toast.error("There is something wrong with our server's connection to Stripe.");
          return;
        }
        const idx = cardsSelectionStatuses.findIndex((elm) => elm === true);
        const stripeResponse = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethods[idx]?.id,
        });
        if (stripeResponse.error) {
          toast.error(stripeResponse.error.message);
          setProcessing(false);
          return;
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);
      } catch (err) {
        toast.error(err.message);
      }

      try {
        // make api call to update order after payment succeeded and set cart
        await axiosPrivate.patch("/orders/payments/confirm", {});

        dispatch({
          type: "SET_CART",
          cart: [],
        });
        toast.success("Payment successful!");
        navigate("/orders");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    if (confirmCard) {
      makePayment();
    }
  }, [confirmCard]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOpenDialog(true);
  };
  return (
    <>
      <Grid container rowSpacing={2} colSpacing={4}>
        {paymentMethods?.map((method, idx) => (
          <Grid item xs={4}>
            <CreditCard
              style={{
                width: "fit-content",
                blockSize: "fit-content",
                transform: cardsSelectionStatuses[idx] === true ? "scale(1.1)" : "none",
                boxShadow:
                  cardsSelectionStatuses[idx] === true
                    ? "0 10px 20px rgba(0, 0, 0, 0.3), 0 12px 12px rgba(0, 0, 0, 0.3)"
                    : "none",
              }}
              key={method.id}
              idx={idx}
              method={method}
              cardsSelectionStatuses={cardsSelectionStatuses}
              setCardsSelectionStatuses={setCardsSelectionStatuses}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        {error && (
          <Typography fontSize="14px" color="red" alignText="left">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled={processing || succeeded}>
            <span>{processing ? "Processing" : "Make payment"}</span>
          </Button>
        </form>
      </Box>
      <ConfirmPaymentDialog openDialog={openDialog} setOpenDialog={setOpenDialog} setConfirmCard={setConfirmCard} />
    </>
  );
}

export default SavedCards;
