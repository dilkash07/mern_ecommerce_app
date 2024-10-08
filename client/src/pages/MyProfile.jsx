import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../utils.jsx/dateFormatter";
import IconBtn from "../components/common/IconBtn";
import Header from "../components/core/Header";

export default function MyProfile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-5">
        <div className="border-b border-orange-100 py-4 mb-10">
          <h1 className="italic text-3xl mb-3">My Profile</h1>
        </div>
        <div className="flex items-center justify-between rounded-md border-[1px] p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.image?.image_url}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">About</p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
          <p
            className={`text-sm font-medium ${
              !user?.additionalDetails?.about && "text-gray-600"
            }`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">Personal Details</p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
          <div className="flex max-w-[500px] justify-between">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-gray-600">First Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-gray-600">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.lastName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                    "Add Date Of Birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
