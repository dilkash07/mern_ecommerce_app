import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { orderEndpoints } from "../apis";
import { setOrderItem, setShippingInfo } from "../../redux/slice/OrderSlice";
import { setCart } from "../../redux/slice/CartSlice";

const { NEW_ORDER_API } = orderEndpoints;

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
      dispatch(setOrderItem(response.data.response));
      dispatch(setShippingInfo(response.data.shippingInfo));
      dispatch(setCart([]));
      navigate("/order/confirm");
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}
