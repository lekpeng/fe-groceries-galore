import { Box, Button, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useStateValue from "../../../hooks/useStateValue";
import ConfirmPaymentDialog from "./ConfirmPaymentDialog";

function NewCardForm({ clientSecret }) {
  const navigate = useNavigate();
  const [{ cart }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [invalid, setInvalid] = useState(true);

  const [error, setError] = useState(null);

  const [confirmCard, setConfirmCard] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (ev) => {
    setInvalid(ev.empty || ev.error);
    setError(ev.error ? ev.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOpenDialog(true);
  };

  useEffect(() => {
    const makePayment = async () => {
      setProcessing(true);
      try {
        if (!clientSecret) {
          toast.error("There is something wrong with our server's connection to Stripe.");
          return;
        }
        const stripeResponse = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
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
        toast.error(err?.response?.data?.error);
      }
    };
    if (confirmCard) {
      makePayment();
    }
  }, [confirmCard]);

  return (
    <>
      <form style={{ margin: "auto", maxWidth: "400px", marginTop: "20px" }} onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />

        <Box sx={{ mt: 4 }}>
          {error && (
            <Typography fontSize="14px" color="red" alignText="left">
              {error}
            </Typography>
          )}

          <Button type="submit" disabled={processing || invalid || succeeded}>
            <span>{processing ? "Processing" : "Make payment"}</span>
          </Button>
        </Box>
      </form>
      <ConfirmPaymentDialog openDialog={openDialog} setOpenDialog={setOpenDialog} setConfirmCard={setConfirmCard} />
    </>
  );
}

export default NewCardForm;
