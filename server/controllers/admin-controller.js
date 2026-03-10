const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user data" });
  }
};
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user data",
      error: error.message,
    });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user data",
      error: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching contacts" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id
    const deletedContact = await Contact.findByIdAndDelete(id)
    return res.status(200).json({message: "contact deleted successfully", data: deletedContact})
  } catch (error) {
    return res.status(500).json({message: "Error deleting contact"})
  }
} 

module.exports = {
  getAllUsers,
  getAllContacts,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteContact
};
