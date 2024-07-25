const Address = require("../models/Address");

exports.addAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      name,
      mobile,
      pincode,
      state,
      address,
      locality,
      city,
      addressType,
      defaultAddress,
    } = req.body;

    const isAddress = await Address.find({ user: id });
    if (isAddress) {
      isAddress.filter((address) => {
        if (address.defaultAddress === true && defaultAddress === true) {
          address.defaultAddress = false;
          address.save();
        }
      });
    }

    const newAddress = await Address.create({
      user: id,
      name,
      mobile,
      pincode,
      state,
      address,
      locality,
      city,
      addressType,
      defaultAddress,
    });

    isAddress.push(newAddress);

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      response: isAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding address",
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await Address.find({ user: id });

    res.status(200).json({
      success: true,
      message: "Address details fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching address details",
    });
  }
};

exports.removeAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.query;

    await Address.findByIdAndDelete(addressId);
    const isAddress = await Address.find({ user: id });

    if (isAddress.length > 0) {
      const defaultAddress = isAddress.find(
        (address) => address.defaultAddress === true
      );

      if (!defaultAddress || defaultAddress == undefined) {
        isAddress[0].defaultAddress = true;
        isAddress[0].save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address removed successfully",
      response: isAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while removing address",
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.query;
    const {
      name,
      mobile,
      pincode,
      state,
      address,
      locality,
      city,
      addressType,
      defaultAddress,
    } = req.body;

    const isAddress = await Address.find({ user: id });

    const newAddress = address;

    isAddress.filter((address) => {
      if (address.defaultAddress === true && defaultAddress === true) {
        address.defaultAddress = false;
        address.save();
      }
      if (address._id.toString() === addressId.toString()) {
        address.name = name;
        address.mobile = mobile;
        address.pincode = pincode;
        address.state = state;
        address.address = newAddress;
        address.locality = locality;
        address.city = city;
        address.addressType = addressType;
        address.defaultAddress = defaultAddress;
        address.save();
      }
    });

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      response: isAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating address",
    });
  }
};

exports.makeDefaultAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressId } = req.query;

    const isAddress = await Address.find({ user: id });

    isAddress.filter((address) => {
      if (address.defaultAddress === true) {
        address.defaultAddress = false;
        address.save();
      }
      if (address._id.toString() === addressId.toString()) {
        address.defaultAddress = true;
        address.save();
      }
    });

    res.status(200).json({
      success: true,
      message: "Default address successfully",
      response: isAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrrong while default address",
    });
  }
};
