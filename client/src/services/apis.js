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
