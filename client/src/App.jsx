import { Route, Routes } from "react-router-dom";
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

function App() {
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
        <Route path="/SingleItem" element={<SingleItem />} />
        <Route path="/SingleItem/:itemId" element={<SingleItem />} />
        <Route path="/uploadProduct" element={<Product />} />
        <Route path="/filteredProduct" element={<FilterProduct />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
