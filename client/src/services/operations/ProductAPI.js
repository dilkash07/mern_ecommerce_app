import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { productEndPoints } from "../apis";
import axios from "axios";

const { UPLOAD_PRODUCT_API } = productEndPoints;

export async function uploadImage(files) {
  const formData = new FormData();
  formData.append("imageFile", files);

  console.log(Array.from(formData));
  // try {
  //   const response = await axios.post(
  //     "http://localhost:4000/api/v1/product/imageUpload",
  //     formData
  //   );

  //   console.log(response);
  //   toast.success(response.data.message);

  //   return response;
  // } catch (error) {
  //   toast.error(error.respnse.data.message);
  // }
}

export async function uploadProduct(formData) {
  const toastId = toast.loading("Product uploading...");

  console.log(formData);
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
  console.log(Array.from(newForm));

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
    // console.log(error);
  }

  toast.dismiss(toastId);
}

// get single product
