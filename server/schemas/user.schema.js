const { model, Schema, default: mongoose } = require("mongoose");
const { AddressSchema } = require("./address.schema");

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
  cart_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "carts",
  },
  addresses: [AddressSchema],
});

const UserModel = model("users", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
