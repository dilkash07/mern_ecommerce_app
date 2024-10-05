import toast from "react-hot-toast";
import { setOrders } from "../../redux/slice/AdminSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

const { GET_ORDERS_API } = adminEndpoints;

export function getOrders() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_ORDERS_API, null);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setOrders(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error: ", error);
    }
    dispatch(setLoading(false));
  };
}

export function updateOrderStatus(status, UPDATE_ORDER_STATUS_API) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Put", UPDATE_ORDER_STATUS_API, {
        status,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setOrders(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
