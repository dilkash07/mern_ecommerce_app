import { setLoading } from "../../redux/slice/LoaderSlice";
import { setWishlist } from "../../redux/slice/WishlistSlice";
import { setCart } from "../../redux/slice/CartSlice";
import { apiConnector } from "../apiConnector";
import { wishlistEndPoints } from "../apis";
import toast from "react-hot-toast";

const {
  ADD_WISHLIST_API,
  REMOVE_WISHLIST_API,
  GET_WISHLIST_DETAILS_API,
  MOVE_TO_WISHLIST_API,
} = wishlistEndPoints;

export function addWishlist(productId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Post",
        ADD_WISHLIST_API,
        { productId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setWishlist(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function removeWishlist(productId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Delete",
        REMOVE_WISHLIST_API,
        productId,
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(data.response.message);
      }

      toast.success(response.data.message);

      dispatch(setWishlist(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function getWishlistDetails(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Get",
        GET_WISHLIST_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setWishlist(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function moveToWishlist(productId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        MOVE_TO_WISHLIST_API,
        { productId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setWishlist(response.data.wishlist));
      dispatch(setCart(response.data.cart));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
