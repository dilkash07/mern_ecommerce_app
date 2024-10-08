import { settingEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { logout } from "./AuthAPI";

const { UPDATE_PASSWORD_API, DELETE_ACCOUNT_API } = settingEndPoints;

export async function changePassword(formData, token) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("Put", UPDATE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
  toast.remove(toastId);
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("Delete", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(logout(navigate));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.remove(toastId);
  };
}
