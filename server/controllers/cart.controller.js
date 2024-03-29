const { default: mongoose } = require("mongoose");
const { CartModel } = require("../schemas/cart.schema");
const { OrderModel } = require("../schemas/order.schema");
const { UserModel } = require("../schemas/user.schema");
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
    const cartItem = await CartModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $unwind: "$items" },
      { $match: { "items.product_id": mongoose.Types.ObjectId(product_id) } },
      { $project: { items: 1 } },
    ]);

    const removedItem = cartItem[0].items;
    let priceToBeDeducted = 0;
    if (removedItem) {
      priceToBeDeducted =
        parseInt(removedItem.price) * parseInt(removedItem.quantity);
    }
    const data = await CartModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      {
        $inc: {
          total_price: -priceToBeDeducted,
        },
        $pull: {
          items: { product_id: mongoose.Types.ObjectId(product_id) },
        },
      },
      { new: true }
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

const updateCartQuantity = async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    //console.log("cartId", cartId);
    //console.log("productId", productId);
    //console.log("quantity", quantity);

    const updateItems = await CartModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(cartId),
        },
      },
      {
        $project: { items: 1 },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.product_id": mongoose.Types.ObjectId(productId),
        },
      },
    ]);

    const cartItem = { ...updateItems[0].items };
    let priceToBeAddedOrNegate =
      (quantity - cartItem.quantity) * cartItem.price;
    const data = await CartModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(cartId),
        "items.product_id": productId,
      },
      {
        $set: {
          "items.$.quantity": quantity,
        },
        $inc: {
          total_price: priceToBeAddedOrNegate,
        },
      }
    );
    res.send(data).json().status(201);
  } catch (error) {
    console.log(error);
    next({ error });
  }
};

const getUserCartSummary = async (req, res, next) => {
  try {
    const cartId = req.query["id"];
    const summaryData = await CartModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(cartId) } },
      {
        $project: {
          total_price: 1,
          count: { $size: "$items" },
        },
      },
      {
        $addFields: {
          delivery_charges: {
            $cond: [{ $gte: ["$total_price", 500] }, 0, 150],
          },
        },
      },
      {
        $addFields: {
          cart_total: { $add: ["$delivery_charges", "$total_price"] },
        },
      },
      {
        $limit: 1,
      },
    ]);
    res
      .send(...summaryData)
      .json()
      .status(200);
  } catch (error) {
    console.log(error);
    next({ error });
  }
};

const clearUserCart = async (cartId) => {
  try {
    await CartModel.updateOne(
      { _id: mongoose.Types.ObjectId(cartId) },
      { $set: { items: [], updated_at: new Date(), total_price: 0 } }
    );
  } catch (error) {
    throw error;
  }
};

const placeOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    const orderDetails = req.body;
    const order = new OrderModel(orderDetails);
    const userData = await UserModel.findById(orderDetails?.customer_id);
    const data = await order.save();
    if (userData) {
      clearUserCart(userData.cart_id);
    }
    res.send({ data });
  } catch (error) {
    console.log(error);
    next({ error });
  }
};

module.exports = {
  getCartQuantity,
  getCartItems,
  removeCartItem,
  getUserCartSummary,
  updateCartQuantity,
  placeOrder,
};
