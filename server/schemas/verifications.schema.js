const { Schema, model, default: mongoose } = require("mongoose");

const VerificationSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  email: {
    type: String,
    required: [true, "Email id is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

const VerificationModal = model("verifications", VerificationSchema);

module.exports = {
  VerificationSchema,
  VerificationModal,
};
