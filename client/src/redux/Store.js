import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slice/LoaderSlice";
import cartReducer from "./slice/CartSlice";
import wishlistReducer from "./slice/WishlistSlice";
import queryReducer from "./slice/QuerySlice";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/UserSlice";
import productReducer from "./slice/ProductSlice";
import orderReducer from "./slice/OrderSlice";
import AdminReducer from "./slice/AdminSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    query: queryReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    admin: AdminReducer,
  },
});

export default store;
