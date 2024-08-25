import { apiConnector } from "../apiConnector";
import { cartEndPoints } from "../apis";
import { setCart } from "../../redux/slice/CartSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";
import toast from "react-hot-toast";
import { setWishlist } from "../../redux/slice/WishlistSlice";

const {
  ADD_CART_API,
  REMOVE_CART_API,
  GET_CART_DEATAILS_API,
  MOVE_TO_CART_API,
  RESET_CART_API,
} = cartEndPoints;

export function addCart(productId, quantity, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Post",
        ADD_CART_API,
        {
          productId,
          quantity,
        },
        { Authorization: `Bearer ${token}` }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      if (response.data.message) {
        toast.success(response.data.message);
      }

      dispatch(setCart(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function removeCart(productId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Delete",
        REMOVE_CART_API,
        productId,
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);

      dispatch(setCart(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function getCartDetails(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_CART_DEATAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setCart(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function moveToCart(productId, quantity, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        MOVE_TO_CART_API,
        { productId, quantity },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setWishlist(response.data.wishlist));
      dispatch(setCart(response.data.cart));

      // if item less than 1 and navigate to cart
      if (response.data.wishlist?.items?.length < 1) {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export async function resetCart(token) {
  try {
    const response = await apiConnector("Delete", RESET_CART_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
