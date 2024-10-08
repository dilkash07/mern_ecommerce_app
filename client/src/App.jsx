import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleItem from "./pages/SingleItem";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Product from "./pages/Product";
import FilterProduct from "./pages/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/ProfileAPI";
import { getCartDetails } from "./services/operations/CartAPI";
import { getWishlistDetails } from "./services/operations/WishlistAPI";
import { getAllProduct } from "./services/operations/ProductAPI";
import { getProductCategory } from "./services/operations/AdminAPI";
import MyProfile from "./pages/MyProfile";
import Setting from "./pages/Setting";
import SavedAddress from "./pages/SavedAddress";
import { getAddress } from "./services/operations/AddressAPI";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutPayment from "./pages/CheckoutPayment";
import OrderConfirm from "./pages/OrderConfirm";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import { getOrder } from "./services/operations/OrderAPI";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import AddItem from "./pages/admin/AddItem";
import ListItems from "./pages/admin/ListItems";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token, navigate));
      dispatch(getCartDetails(token));
      dispatch(getWishlistDetails(token));
      dispatch(getAddress(token));
      dispatch(getOrder(token));
    }
    dispatch(getAllProduct());
    dispatch(getProductCategory());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/SingleItem/:itemId" element={<SingleItem />} />
        <Route path="/uploadProduct" element={<Product />} />
        <Route path="/admin/" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="" element={<Navigate to={"Dashboard"} />} />
          <Route path="addItems" element={<AddItem />} />
          <Route path="listItems" element={<ListItems />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/filteredProduct" element={<FilterProduct />} />
        <Route path="/dashboard/settings" element={<Setting />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/savedAddress" element={<SavedAddress />} />
        <Route path="/checkout/address" element={<CheckoutAddress />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/order/details/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
