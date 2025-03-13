const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, age, gender, contact, email } = req.body;

    if (!req.files || !req.files.photo || !req.files.id_card) {
      return res
        .status(400)
        .json({ message: "Photo and ID card are required" });
    }

    const photoUrl = req.files.photo[0].path;
    const idCardUrl = req.files.id_card[0].path;

    const newUser = new User({
      name,
      age,
      gender,
      contact,
      email,
      photo: photoUrl,
      id_card: idCardUrl,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      users: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }

    const updates = req.body;

    if (req.files) {
      if (req.files.photo) {
        updates.photo = req.files.photo[0].path;
      }
      if (req.files.id_card) {
        updates.id_card = req.files.id_card[0].path;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { createUser, getAllUsers, updateUser, deleteUser };
