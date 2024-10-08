import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";
import { setUser } from "../../redux/slice/UserSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";
import toast from "react-hot-toast";
import { logout } from "./AuthAPI";

const { GET_USER_DETAILS_API, UPDATE_PROFILE_PICTURE_API, UPDATE_PROFILE_API } =
  profileEndPoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
    } catch (error) {
      dispatch(logout(navigate));
      console.log(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateProfilePicture(token, profilePicture) {
  const formData = new FormData();
  formData.append("profilePicture", profilePicture);
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_PROFILE_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateProfile(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("Put", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.remove(toastId);
  };
}
