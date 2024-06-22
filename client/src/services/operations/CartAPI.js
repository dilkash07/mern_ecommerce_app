import { cartEndPoints } from "../apis";
import { setCart, setLoading } from "../../redux/slice/CartSlice";
import axios from "axios";
import toast from "react-hot-toast";

const { ADD_CART_API, REMOVE_CART_API, GET_CART_DEATAILS_API } = cartEndPoints;

export function addCart(userId, productId, quantity) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(ADD_CART_API, {
        userId,
        productId,
        quantity,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setCart(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function removeCart(userId, productId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(REMOVE_CART_API, {
        userId,
        productId,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);

      dispatch(setCart(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function getCartDetails(userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(GET_CART_DEATAILS_API, { userId });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setCart(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
