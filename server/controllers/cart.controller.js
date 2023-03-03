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
    next({ error });
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const id = req.query["id"];
    const data = await CartModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $project: { items: 1 } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product_id",
          foreignField: "_id",
          as: "product_details",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$product_details", 0],
              },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $addFields: {
          quantity: "$items.quantity",
          _id: "$items.product_id",
          cartId: id,
        },
      },
      { $project: { items: 0, product_details: 0 } },
    ]);
    res
      .send({
        data,
      })
      .status(200)
      .json();
  } catch (error) {
    next({ error });
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const id = req.query["id"];
    const { product_id } = req.body;
    console.log(id, product_id);
    const cartItem = await CartModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: "$items" },
      { $match: { "items.product_id": mongoose.Types.ObjectId(product_id) } },
      { $project: { items: 1 } },
    ]);

    console.log(cartItem);

    const data = await CartModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      {
        $pull: {
          items: { product_id: mongoose.Types.ObjectId(product_id) },
        },
      }
    );
    res
      .send({
        data,
      })
      .json()
      .status(200);
  } catch (error) {
    console.log(error);
    next({ error });
  }
};

const getUserCartSummary = async (req, res, next) => {
  try {
    const summaryData = await CartModel.aggregate([{}]);
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  getCartQuantity,
  getCartItems,
  removeCartItem,
  getUserCartSummary,
};
