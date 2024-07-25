import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import SingleItem from "./pages/SingleItem";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Product from "./pages/Product";
import AdminDashboard from "./pages/AdminDashboard";
import FilterProduct from "./pages/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/ProfileAPI";
import { getCartDetails } from "./services/operations/CartAPI";
import { getWishlistDetails } from "./services/operations/WishlistAPI";
import {
  getAllProduct,
  getProductCategory,
} from "./services/operations/ProductAPI";
import MyProfile from "./pages/MyProfile";
import Setting from "./pages/Setting";
import SavedAddress from "./pages/SavedAddress";
import { getAddress } from "./services/operations/AddressAPI";

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
    }
    dispatch(getAllProduct());
    dispatch(getProductCategory());
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
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
        <Route path="/filteredProduct" element={<FilterProduct />} />
        <Route path="/dashboard/settings" element={<Setting />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/savedAddress" element={<SavedAddress />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
