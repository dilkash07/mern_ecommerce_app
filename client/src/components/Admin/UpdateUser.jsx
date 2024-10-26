import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/operations/AdminAPI";

const UpdateUser = ({ setUpdateUser }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.admin);

  const [userRole, setUserRole] = useState(user.role);

  const changeHandler = (event) => {
    setUserRole(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(userRole, user._id, token));
    setUpdateUser(false);
  };

  return (
    <div className="h-full w-full grid place-items-center bg-white bg-opacity-50 fixed top-0 right-0">
      <form
        className="w-80 bg-orange-200 p-3 rounded-lg text-sm m-5"
        onSubmit={submitHandler}
      >
        <p className="text-md font-bold">Update User</p>

        <div className="flex flex-col gap-2 my-5">
          <input
            type="text"
            className="w-full px-2 py-1 rounded-md outline-none"
            readOnly
            value={user.firstName + " " + user.lastName}
          />

          <input
            type="text"
            className="w-full px-2 py-1 rounded-md outline-none"
            readOnly
            value={user.email}
          />

          <select
            className="px-1.5 py-1 outline-none border rounded-md"
            onChange={changeHandler}
            defaultValue={user.role}
          >
            <option value="User">User</option>
            <option value="Admin"> Admin </option>
          </select>
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button
            className="border border-orange-500 text-orange-500 rounded-full px-2 py-1"
            onClick={() => setUpdateUser(false)}
          >
            Cancel
          </button>
          <button className="bg-orange-500 text-white rounded-full px-2 py-1">
            UpdateUser
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
