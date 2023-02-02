const { default: mongoose } = require("mongoose");
const { CartModel } = require("../schemas/cart.schema");

const getCartQuantity = async (req, res, next) => {
  try {
    const id = req.query["id"];
    console.log("here................", id);
    const data = await CartModel.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $project: { items: 1 },
      },
      {
        $unset: "items",
      },
      //   {
      //     $project: { items: { $sum: "$items" } },
      //   },
      //   {
      //     $group: { _id: null, cartItems: { $sum: "$items" } },
      //   },
    ]).exec();
    res.send({ data }).json().status(200);
  } catch (error) {
    console.error(error);
    next({ error });
  }
};

module.exports = {
  getCartQuantity,
};
