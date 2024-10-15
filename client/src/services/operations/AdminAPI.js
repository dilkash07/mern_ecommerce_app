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

const {
  GET_USERS_API,
  GET_ORDERS_API,
  UPDATE_ORDER_STATUS_API,
  UPLOAD_PRODUCT_API,
  UPDATE_PRODUCT_API,
  UPLOAD_PRODUCT_CATEGORY_API,
  GET_PRODUCTS_API,
} = adminEndpoints;

export function getUsers(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

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

export function getOrders(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_ORDERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

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

export function updateOrderStatus(status, id, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_ORDER_STATUS_API + id,
        {
          status,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

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

export async function uploadProduct(formData, token) {
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
    const response = await apiConnector("Post", UPLOAD_PRODUCT_API, newForm, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
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

export function updateProduct(data, id, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Product updating...");
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_PRODUCT_API + id,
        data,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(setProduct(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export function getProducts(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_PRODUCTS_API, null, {
        Authorization: `Bearer ${token}`,
      });

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

export function uploadProductCategory(categoryName, categoryImage, token) {
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
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
