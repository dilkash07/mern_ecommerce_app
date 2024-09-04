import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../services/operations/SettingAPI";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccountHandler = () => {
    dispatch(deleteAccount(token, navigate));
  };

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border border-orange-500 bg-orange-100 p-8 md:px-12">
        <div className="h-14 min-w-14 flex items-center justify-center rounded-full text-white bg-orange-600">
          <FiTrash2 size={30} />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-orange-400">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-orange-600"
            onClick={deleteAccountHandler}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
}
