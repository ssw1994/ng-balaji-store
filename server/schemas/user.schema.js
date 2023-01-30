const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const UserModel = model("users", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
