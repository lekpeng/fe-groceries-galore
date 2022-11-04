import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import Register from "./pages/user/Register";
import Confirmation from "./pages/user/Confirmation";
import Login from "./pages/user/Login";
import Layout from "./Layout";
import PageNotFound from "./pages/PageNotFound";
import Unauthorised from "./pages/Unauthorised";
import Products from "./pages/product/Products";
import Product from "./pages/product/Product";
import Merchants from "./pages/merchant/Merchants";
import Checkout from "./pages/order/Checkout";
import Payment from "./pages/order/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./pages/order/Order";
import Orders from "./pages/order/Orders";
import Test from "./pages/Test";
import NewProduct from "./pages/product/NewProduct";
import MerchantStore from "./pages/merchant/MerchantStore";

const promise = loadStripe(
  "pk_test_51LyWiyHrSLP2bvAc3Zz5TtGUCLz2V5XEbpVA6R8ENz4SYm5vulUqAXQ8733IFCAWaE4rJ7QinE7YzrglwFMVWeaa0053b2ovyM"
);

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Products />} />
          <Route path="/test" element={<Test />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:emailToken" element={<Confirmation />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorised" element={<Unauthorised />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="merchants/:merchantId" element={<MerchantStore />} />

          {/* protected routes: customer and merchant */}
          <Route element={<RequireAuth allowedUserTypes={["Customer", "Merchant"]} />}>
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<Order />} />
          </Route>

          {/* protected routes: customer only */}
          <Route element={<RequireAuth allowedUserTypes={["Customer"]} />}>
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="payment"
              element={
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              }
            />
          </Route>

          {/* protected routes: merchant only */}
          <Route element={<RequireAuth allowedUserTypes={["Merchant"]} />}>
            <Route path="products/:productId" element={<Product />} />
            <Route path="products/new" element={<NewProduct />} />
          </Route>

          {/* catch-all */}

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
