import { setAddress, setLoading } from "../../redux/slice/UserSlice";
import { apiConnector } from "../apiConnector";
import { addressEndPoints } from "../apis";
import toast from "react-hot-toast";

const {
  ADD_ADDRESS_API,
  GET_ADDRESS_API,
  REMOVE_ADDRESS_API,
  UPDATE_ADDRESS_API,
  MAKE_DEFAULT_ADDRESS_API,
} = addressEndPoints;

export function addAddress(token, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", ADD_ADDRESS_API, data, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setAddress(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function getAddress(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_ADDRESS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setAddress(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function removeAddress(token, addressId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Delete",
        REMOVE_ADDRESS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        { addressId }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setAddress(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateAddress(token, data, addressId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_ADDRESS_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        },
        { addressId }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setAddress(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function makeDefaultAddress(token, addressId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        MAKE_DEFAULT_ADDRESS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        { addressId }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setAddress(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
