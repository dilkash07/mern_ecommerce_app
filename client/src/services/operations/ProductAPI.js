import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { productEndPoints } from "../apis";
import { setLoading } from "../../redux/slice/LoaderSlice";
import {
  setProduct,
  setFilteredProduct,
  setRecommendedProduct,
  setProductDetails,
  setProductCategories,
} from "../../redux/slice/ProductSlice";
import { setCategories } from "../../redux/slice/AdminSlice";

const {
  GET_PRODUCT_CATEGORY_API,
  GET_ALL_PRODUCT_API,
  GET_PRODUCT_DETAILS_API,
  GET_FILTERED_PRODUCT_API,
  GET_RECOMMENDED_PRODUCT_API,
  ADD_REVIEWS_API,
} = productEndPoints;

// get all product
export function getAllProduct() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_ALL_PRODUCT_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProduct(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

// get product category
export function getProductCategory() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("Get", GET_PRODUCT_CATEGORY_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProductCategories(response.data.response));
      dispatch(setCategories(response.data.response));
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log("error : ", error);
    }
  };
}

// get filtered product
export function getFilteredProduct(
  query = null,
  category = null,
  brand = null,
  minPrice = null,
  maxPrice = null,
  minDiscount = null,
  minRating = null,
  sortOrder = null,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Get",
        GET_FILTERED_PRODUCT_API,
        null,
        null,
        {
          query,
          category,
          brand,
          minPrice,
          maxPrice,
          minDiscount,
          minRating,
          sortOrder,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setFilteredProduct(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
      navigate(-1);
    }
    dispatch(setLoading(false));
  };
}

//  get product details
export function getProductDetails(itemId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setProductDetails([]));
    dispatch(setRecommendedProduct([]));
    try {
      const productDetails = await apiConnector(
        "Get",
        GET_PRODUCT_DETAILS_API + itemId
      );
      const category = productDetails.data.response.category;
      const recommendedProduct = await apiConnector(
        "Post",
        GET_RECOMMENDED_PRODUCT_API,
        { category, itemId }
      );

      if (!productDetails.data.success || !recommendedProduct.data.success) {
        throw new Error(productDetails.data.message);
      }

      dispatch(setProductDetails(productDetails.data.response));
      dispatch(setRecommendedProduct(recommendedProduct.data.response));
    } catch (error) {
      error.response.data.message;
    }
    dispatch(setLoading(false));
  };
}

//add reviews
export function addReviews(productId, rating, comment, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    if (!token) {
      toast.error("Can't submit review please login");
      toast.dismiss(toastId);
      return navigate("/login");
    }
    try {
      const response = await apiConnector(
        "Post",
        ADD_REVIEWS_API,
        { productId, rating, comment },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
