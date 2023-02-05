const { default: mongoose } = require("mongoose");
const { CartModel } = require("../schemas/cart.schema");

const getCartQuantity = async (req, res, next) => {
  try {
    const id = req.query["id"];
    const data = await CartModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $project: { items: 1 } },
      { $unwind: "$items" },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]).exec();
    res.send({ data });
  } catch (error) {
    console.error(error);
    next({ error });
  }
};

module.exports = {
  getCartQuantity,
};
