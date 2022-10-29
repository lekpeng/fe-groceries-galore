import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import Register from "./pages/user/Register";
import Confirmation from "./pages/user/Confirmation";
import Login from "./pages/user/Login";
import Layout from "./Layout";
import AuthNeeded from "./pages/AuthNeeded";
import CustomerOnly from "./pages/CustomerOnly";
import MerchantOnly from "./pages/MerchantOnly";
import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";
import Unauthorised from "./pages/Unauthorised";
import Products from "./pages/product/Products";
import Product from "./pages/product/Product";
import Merchants from "./pages/merchant/Merchants";
import Orders from "./pages/order/Orders";
import Checkout from "./pages/order/Checkout";
import Payment from "./pages/order/Payment";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Products />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:emailToken" element={<Confirmation />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorised" element={<Unauthorised />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<Product />} />

          <Route path="merchants" element={<Merchants />} />

          {/* protected routes: customer and merchant */}
          <Route element={<RequireAuth allowedUserTypes={["Customer", "Merchant"]} />}>
            <Route path="auth-needed" element={<AuthNeeded />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* protected routes: customer only */}
          <Route element={<RequireAuth allowedUserTypes={["Customer"]} />}>
            <Route path="customer-only" element={<CustomerOnly />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          {/* protected routes: merchant only */}
          <Route element={<RequireAuth allowedUserTypes={["Merchant"]} />}>
            <Route path="merchant-only" element={<MerchantOnly />} />
          </Route>

          {/* catch-all */}

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
