const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
  name: { type: String, required: [true, "Address name is required"] },
  mobile: { type: String, required: [true, "Mobile is required"] },
  email: { type: String, required: [true, "Email is required"] },
  address_line1: {
    type: String,
    required: [true, "Address line 1 is required"],
  },
  address_line2: {
    type: String,
    required: [true, "Address line 2 is required"],
  },
  city: { type: String, required: [true, "City is required"] },
  state: { type: String, required: [true, "State is required"] },
  zip_code: { type: String, required: [true, "Zip code is required"] },
  country: { type: String, required: [true, "Country is required"] },
  latitude: { type: Number, required: [false, "Latitude is required"] },
  longitude: { type: Number, required: [false, "Longitude is required"] },
});

const AddressModel = model("address", AddressSchema);

module.exports = {
  AddressSchema,
  AddressModel,
};
