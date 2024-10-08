import React from "react";
import ChangeProfilePicture from "../components/setting/ChangeProfilePicture";
import EditProfile from "../components/setting/EditProfile";
import ChangePassword from "../components/setting/ChangePassword";
import DeleteAccount from "../components/setting/DeleteAccount";
import Header from "../components/core/Header";

const Setting = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h1 className="mb-14 text-3xl font-medium">Edit Profile</h1>
        <ChangeProfilePicture />
        <EditProfile />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Setting;
