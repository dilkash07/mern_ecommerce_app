import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { orderEndpoints, productEndPoints } from "../apis";
import {
  setOrder,
  setOrderItem,
  setShippingInfo,
} from "../../redux/slice/OrderSlice";
import { setCart } from "../../redux/slice/CartSlice";
import { setRecommendedProduct } from "../../redux/slice/ProductSlice";

const { NEW_ORDER_API, GET_ORDER_API } = orderEndpoints;
const { GET_RECOMMENDED_PRODUCT_API } = productEndPoints;

export function newOrder(
  shippingInfo,
  orderItem,
  paymentInfo,
  paymentMethod,
  token,
  payBtn,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    payBtn.current.disabled = true;
    try {
      const response = await apiConnector(
        "Post",
        NEW_ORDER_API,
        { shippingInfo, orderItem, paymentInfo, paymentMethod },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        payBtn.current.disabled = false;
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);

      sessionStorage.setItem(
        "orderItem",
        JSON.stringify(response.data.response)
      );

      sessionStorage.setItem(
        "shippingInfo",
        JSON.stringify(response.data.shippingInfo)
      );

      dispatch(setCart([]));
      navigate("/order/confirm");
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function getOrder(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("Get", GET_ORDER_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setOrder(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function getOrderDetails(API_URL) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("Get", API_URL);
      const category = response.data.response.orderItem.product.category;
      const itemId = response.data.response.orderItem.product._id;

      const recommendedProduct = await apiConnector(
        "Post",
        GET_RECOMMENDED_PRODUCT_API,
        { category, itemId }
      );

      if (!response.data.success || !recommendedProduct.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setOrderItem(response.data.response));
      dispatch(setRecommendedProduct(recommendedProduct.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
}
