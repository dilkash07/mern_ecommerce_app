import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCamera } from "react-icons/io";
import IconBtn from "../common/IconBtn";
import { updateProfilePicture } from "../../services/operations/ProfileAPI";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const clickHandler = () => {
    fileInputRef.current.click();
  };

  const changeHandler = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  const fileUploadHandler = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      dispatch(updateProfilePicture(token, file));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 rounded-md border p-8 px-12">
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <img
              src={preview || user?.image?.image_url}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <button
              onClick={clickHandler}
              disabled={loading}
              className="h-6 w-6 grid place-items-center cursor-pointer rounded-full bg-gray-200 absolute bottom-0 -right-1.5"
            >
              <IoIosCamera size={20} />
            </button>
          </div>
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row flex-wrap gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={changeHandler}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={fileUploadHandler}
                className="md:"
              >
                {!loading && <FiUpload className="text-lg" />}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
