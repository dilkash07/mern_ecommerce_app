import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";
import wishlistReducer from "./slice/WishlistSlice";
import queryReducer from "./slice/QuerySlice";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/UserSlice";
import productReducer from "./slice/ProductSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    query: queryReducer,
    auth: authReducer,
    user: userReducer,
    product: productReducer,
  },
});

export default store;
