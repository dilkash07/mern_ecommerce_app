import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";
import { setLoading } from "../../redux/slice/AuthSlice";
import { setUser } from "../../redux/slice/UserSlice";
import toast from "react-hot-toast";
import { logout } from "./authAPI";

const { GET_USER_DETAILS_API } = profileEndPoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("this is respnse from user details:  ", response);

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
