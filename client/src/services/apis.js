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
  UPDATE_PROFILE_PICTURE_API: baseUrl + "/profile/updateProfilePicture",
  UPDATE_PROFILE_API: baseUrl + "/profile/updateProfile",
};

// PRODUCT ENDPOINTS
export const productEndPoints = {
  UPLOAD_PRODUCT_API: baseUrl + "/product/uploadProduct",
  ADD_PRODUCT_CATEGORY_API: baseUrl + "/product/uploadProductCategory",
  GET_PRODUCT_CATEGORY_API: baseUrl + "/product/getProductCategory",
  GET_ALL_PRODUCT_API: baseUrl + "/product/getAllProduct",
  GET_FILTERED_PRODUCT_API: baseUrl + "/product/getFilteredProduct",
  GET_RECOMMENDED_PRODUCT_API: baseUrl + "/product/getRecommendedProduct",
  ADD_REVIEWS_API: baseUrl + "/product/addReviews",
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

// SETTING ENDPOINTS
export const settingEndPoints = {
  UPDATE_PASSWORD_API: baseUrl + "/user/changePassword",
  DELETE_ACCOUNT_API: baseUrl + "/user/deleteAccount",
};

// ADDRESS ENDPOINTS
export const addressEndPoints = {
  ADD_ADDRESS_API: baseUrl + "/address/addAddress",
  GET_ADDRESS_API: baseUrl + "/address/getAddress",
  REMOVE_ADDRESS_API: baseUrl + "/address/removeAddress",
  UPDATE_ADDRESS_API: baseUrl + "/address/updateAddress",
  MAKE_DEFAULT_ADDRESS_API: baseUrl + "/address/makeDefaultAddress",
};
