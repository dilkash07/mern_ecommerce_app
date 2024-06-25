const baseUrl = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endPoints = {
  SENDOTP_API: baseUrl + "/user/sendotp",
  SIGNUP_API: baseUrl + "/user/signup",
  LOGIN_API: baseUrl + "/user/login",
};

// PROFILE ENDPOINTS
export const profileEndPoints = {
  GET_USER_DETAILS_API: baseUrl + "/profile/getUserDetails",
};

// PRODUCT ENDPOINTS
export const productEndPoints = {
  UPLOAD_PRODUCT_API: baseUrl + "/product/uploadProduct",
};

// CART ENDPOINTS
export const cartEndPoints = {
  ADD_CART_API: baseUrl + "/cart/addCart",
  REMOVE_CART_API: baseUrl + "/cart/removeCart",
  GET_CART_DEATAILS_API: baseUrl + "/cart/getCartDetails",
};

// WISHLIST ENDPOINTS
export const wishlistEndPoints = {
  ADD_WISHLIST_API: baseUrl + "/wishlist/addWishlist",
  REMOVE_WISHLIST_API: baseUrl + "/wishlist/removeWishlist",
  GET_WISHLIST_DETAILS_API: baseUrl + "/wishlist/getWishlistDetails",
};
