import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCamera } from "react-icons/io";
import IconBtn from "../common/IconBtn";
import { updateProfilePicture } from "../../services/operations/ProfileAPI";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const fileUploadHandler = () => {
    if (imageFile) {
      dispatch(updateProfilePicture(token, imageFile));
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <img
              src={previewSource || user?.image?.image_url}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <button
              onClick={handleClick}
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
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
