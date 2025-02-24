const baseUrl = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endPoints = {
  SENDOTP_API: baseUrl + "/auth/sendotp",
  SIGNUP_API: baseUrl + "/auth/signup",
  LOGIN_API: baseUrl + "/auth/login",
};

// PROFILE ENDPOINTS
export const profileEndPoints = {
  GET_USER_DETAILS_API: baseUrl + "/profile/get-user-details",
  UPDATE_PROFILE_PICTURE_API: baseUrl + "/profile/update-profile-picture",
  UPDATE_PROFILE_API: baseUrl + "/profile/update-profile",
};

// PRODUCT ENDPOINTS
export const productEndPoints = {
  GET_ALL_PRODUCT_API: baseUrl + "/product/get-all-product",
  GET_PRODUCT_DETAILS_API: baseUrl + "/product/get-product-details/",
  GET_PRODUCT_CATEGORY_API: baseUrl + "/product/get-product-category",
  GET_FILTERED_PRODUCT_API: baseUrl + "/product/get-filtered-product",
  GET_RECOMMENDED_PRODUCT_API: baseUrl + "/product/get-recommended-product",
  ADD_REVIEWS_API: baseUrl + "/product/add-reviews",
};

// CART ENDPOINTS
export const cartEndPoints = {
  ADD_CART_API: baseUrl + "/cart/add-cart",
  REMOVE_CART_API: baseUrl + "/cart/remove-cart",
  GET_CART_DEATAILS_API: baseUrl + "/cart/get-cart-details",
  MOVE_TO_CART_API: baseUrl + "/cart/move-to-cart",
  RESET_CART_API: baseUrl + "/cart/reset-cart",
};

// WISHLIST ENDPOINTS
export const wishlistEndPoints = {
  ADD_WISHLIST_API: baseUrl + "/wishlist/add-wishlist",
  REMOVE_WISHLIST_API: baseUrl + "/wishlist/remove-wishlist",
  GET_WISHLIST_DETAILS_API: baseUrl + "/wishlist/get-wishlist-details",
  MOVE_TO_WISHLIST_API: baseUrl + "/wishlist/move-to-wishlist",
};

// SETTING ENDPOINTS
export const settingEndPoints = {
  UPDATE_PASSWORD_API: baseUrl + "/user/change-password",
  DELETE_ACCOUNT_API: baseUrl + "/user/delete-account",
};

// ADDRESS ENDPOINTS
export const addressEndPoints = {
  ADD_ADDRESS_API: baseUrl + "/address/add-address",
  GET_ADDRESS_API: baseUrl + "/address/get-address",
  REMOVE_ADDRESS_API: baseUrl + "/address/remove-address",
  UPDATE_ADDRESS_API: baseUrl + "/address/update-address",
  MAKE_DEFAULT_ADDRESS_API: baseUrl + "/address/make-default-address",
};

// ORDERS ENDPOINTS
export const orderEndpoints = {
  NEW_ORDER_API: baseUrl + "/order/new-order",
  GET_ORDER_API: baseUrl + "/order/get-order",
};

// PAYMENT ENDPOINTS
export const paymentEndpoints = {
  PROCESS_PAYMENT_API: baseUrl + "/payment/process-payment",
};

// ADMIN ENDPOINTS
export const adminEndpoints = {
  GET_ORDERS_API: baseUrl + "/admin/get-orders",
  GET_ORDERS_AND_REVENUE_API: baseUrl + "/admin/get-orders-and-revenue",
  UPDATE_ORDER_STATUS_API: baseUrl + "/admin/update-orrder-status/",
  GET_USERS_API: baseUrl + "/admin/get-users",
  UPDATE_USER_API: baseUrl + "/admin/update-user/",
  GET_PRODUCTS_API: baseUrl + "/admin/get-products",
  GET_PRODUCT_API: baseUrl + "/admin/get-product/",
  UPLOAD_PRODUCT_API: baseUrl + "/admin/upload-product",
  UPDATE_PRODUCT_API: baseUrl + "/admin/update-product/",
  UPLOAD_PRODUCT_CATEGORY_API: baseUrl + "/admin/upload-product-category",
};
