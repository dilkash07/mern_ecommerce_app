import toast from "react-hot-toast";
import {
  setCategories,
  setOrders,
  setProduct,
  setProducts,
  setUsers,
} from "../../redux/slice/AdminSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";
import axios from "axios";

const {
  GET_USERS_API,
  GET_ORDERS_API,
  UPLOAD_PRODUCT_API,
  UPLOAD_PRODUCT_CATEGORY_API,
  GET_PRODUCTS_API,
  GET_PRODUCT_API,
  GET_PRODUCT_CATEGORY_API,
} = adminEndpoints;

export function getUsers() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USERS_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUsers(response.data.data));
    } catch (error) {
      console.log(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

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

export async function uploadProduct(formData) {
  const toastId = toast.loading("Product uploading...");
  const newForm = new FormData();
  newForm.set("title", formData.title);
  newForm.set("description", formData.description);
  newForm.set("brand", formData.brand);
  newForm.set("category", formData.category);
  newForm.set("price", formData.price);
  newForm.set("sellingPrice", formData.sellingPrice);
  newForm.set("quantity", formData.quantity);
  newForm.set("warrantyInformation", formData.warranty);
  newForm.set("returnPolicy", formData.returnPolicy);

  formData.images.forEach((image) => newForm.append("images", image));

  try {
    const response = await axios.post(UPLOAD_PRODUCT_API, newForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);
}

export function getProducts() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_PRODUCTS_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProducts(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function uploadProductCategory(categoryName, categoryImage) {
  const newForm = new FormData();
  newForm.set("categoryName", categoryName);
  newForm.append("categoryImage", categoryImage);

  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Uploading category...");
    try {
      const response = await apiConnector(
        "Post",
        UPLOAD_PRODUCT_CATEGORY_API,
        newForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setCategories(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.remove(toastId);
  };
}

export function getProductCategory() {
  return async (dispatch) => {
    try {
      const response = await apiConnector("Get", GET_PRODUCT_CATEGORY_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setCategories(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
