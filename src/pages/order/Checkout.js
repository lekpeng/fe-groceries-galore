import FlipMove from "react-flip-move";
import useCart from "../../hooks/useCart";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";

function Checkout() {
  const [cart, setCart] = useCart();
  return (
    <>
      <h1>Your Cart</h1>
      <FlipMove>
        {cart?.map((order) => (
          <CheckoutOrderCard key={order?.id} order={order} />
        ))}
      </FlipMove>
    </>
  );
}

export default Checkout;
