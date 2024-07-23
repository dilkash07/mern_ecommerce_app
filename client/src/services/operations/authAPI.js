import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endPoints } from "../apis";
import { setLoading } from "../../redux/slice/AuthSlice";
import { setToken } from "../../redux/slice/AuthSlice";
import { setUser } from "../../redux/slice/UserSlice";
import { setCart } from "../../redux/slice/CartSlice";
import { setWishlist } from "../../redux/slice/WishlistSlice";

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endPoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SENDOTP_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      navigate("/verifyEmail");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 500) {
        navigate("/signup");
      }
    }
    dispatch(setLoading(false));
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      localStorage.setItem("token", JSON.stringify(response.data.token));

      dispatch(setUser(response.data.user));

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setCart(null));
    dispatch(setWishlist(null));
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.success("logged out successfully");
    navigate("/");
  };
}
