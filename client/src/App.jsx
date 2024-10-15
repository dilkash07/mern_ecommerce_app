import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/ProfileAPI";
import { getCartDetails } from "./services/operations/CartAPI";
import { getWishlistDetails } from "./services/operations/WishlistAPI";
import { getAllProduct } from "./services/operations/ProductAPI";
import { getProductCategory } from "./services/operations/ProductAPI";
import { getAddress } from "./services/operations/AddressAPI";
import { getOrder } from "./services/operations/OrderAPI";
import { ACCOUNT_TYPE } from "./utils.jsx/constance";
import "./App.css";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleItem from "./pages/SingleItem";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import FilterProduct from "./pages/FilterProduct";
import MyProfile from "./pages/MyProfile";
import Setting from "./pages/Setting";
import SavedAddress from "./pages/SavedAddress";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutPayment from "./pages/CheckoutPayment";
import OrderConfirm from "./pages/OrderConfirm";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import ListProducts from "./pages/admin/ListIProducts";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Error from "./pages/Error";
import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

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

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/verifyEmail"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/forgotPassword"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route path="/SingleItem/:itemId" element={<SingleItem />} />
        <Route path="/filteredProduct" element={<FilterProduct />} />

        {user?.role === ACCOUNT_TYPE.ADMIN && (
          <Route
            path="/admin/"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="" element={<Navigate to={"Dashboard"} />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="listProducts" element={<ListProducts />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
        )}

        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />

        <Route
          path="/myProfile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/savedAddress"
          element={
            <PrivateRoute>
              <SavedAddress />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout/address"
          element={
            <PrivateRoute>
              <CheckoutAddress />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout/payment"
          element={
            <PrivateRoute>
              <CheckoutPayment />
            </PrivateRoute>
          }
        />

        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <PrivateRoute>
              <OrderConfirm />
            </PrivateRoute>
          }
        />

        <Route
          path="/order/details/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
