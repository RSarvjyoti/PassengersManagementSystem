const { Router } = require("express");
const { createUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user.controller");
const { upload } = require("../utils/cloudinary");

const userRouter = Router();

userRouter.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "id_card", maxCount: 1 },
  ]),
  createUser
);

userRouter.get('/users', getAllUsers);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;
