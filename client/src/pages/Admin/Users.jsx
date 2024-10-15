import React from "react";
import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { formattedDate } from "../../utils.jsx/dateFormatter";

const Users = () => {
  const { users } = useSelector((state) => state.admin);

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-none max-w-7xl mx-auto px-5 relative">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">Users</h1>
      </div>

      <div className="w-full">
        <div className="className='hidden md:grid grid-cols-[1fr_1.5fr_2.5fr_1fr_1fr_1fr] items-center py-1 px-2 border rounded-sm bg-gray-100 text-sm font-bold gap-x-4">
          <p className="w-20">Image</p>
          <p className="max-w-60">Name</p>
          <p>Email</p>
          <p>Role</p>
          <p>Created Date</p>
          <p className="text-center">Actions</p>
        </div>
        {users?.map((user) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1.5fr_2.5fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border rounded-md text-sm my-2"
            key={user._id}
          >
            <div className="h-20 w-20 flex justify-center items-center ">
              <img
                src={user.image.image_url}
                alt={user.firstName}
                className="w-16 aspect-square rounded-full object-cover"
              />
            </div>
            <p className="max-w-60 text-left">
              {user.firstName + " " + user.lastName}
            </p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <p>{formattedDate(user.createdAt)}</p>
            <p className="grid place-items-center">
              <MdEditNote size={25} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
