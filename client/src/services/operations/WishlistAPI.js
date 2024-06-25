import { setLoading, setWishlist } from "../../redux/slice/WishlistSlice";
import { apiConnector } from "../apiConnector";
import { wishlistEndPoints } from "../apis";
import { cartEndPoints } from "../apis";
import toast from "react-hot-toast";

const { ADD_WISHLIST_API, REMOVE_WISHLIST_API, GET_WISHLIST_DETAILS_API } =
  wishlistEndPoints;

const { GET_CART_DEATAILS_API } = cartEndPoints;

export function addWishlist(userId, productId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", ADD_WISHLIST_API, {
        userId,
        productId,
      });

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

export function removeWishlist(userId, productId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Delete", REMOVE_WISHLIST_API, {
        userId,
        productId,
      });

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

export function getWishlistDetails(userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_WISHLIST_DETAILS_API, {
        userId,
      });

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
