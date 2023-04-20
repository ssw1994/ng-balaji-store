const { OrderModel } = require("../schemas/order.schema");
const mongoose = require("mongoose");
const fetchMyOrders = async (req, res, next) => {
  try {
    const _id = req.query["id"];
    const data = await OrderModel.aggregate([
      {
        $match: { customer_id: mongoose.Types.ObjectId(_id) },
      },
      { $unwind: "$items" },
      {
        $addFields: {
          product_id: "$item._id",
        },
      },
      {
        $lookup: {
          from: "products",
          pipeline: [
            {
              $project: {
                _id: 0,
              },
            },
          ],
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
          quantity: "$items.quntity",
          product_id: "$items.product_id",
          cartId: _id,
        },
      },

      {
        $group: {
          _id: "$_id",
          order_date: { $first: "$created_at" },
          updated_date: { $first: "$updated_at" },
          order_quantity: { $sum: 1 },
          shipping_address: { $first: "$shipping_address" },
          billing_address: { $first: "$billing_address" },
          order_status: { $first: "$order_status" },
          order_total: { $first: "$total_price" },
          items: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

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

const fetchOrderCount = async (req, res, next) => {
  try {
    const id = req.query["id"];
    const data = await OrderModel.aggregate([
      {
        $match: { customer_id: mongoose.Types.ObjectId(id) },
      },
      {
        $group: {
          _id: null,
          numberOfOrders: { $sum: 1 },
        },
      },
    ]);
    let orders = null;
    if (data?.length > 0) {
      orders = data[0].numberOfOrders;
    }
    res.send({ orders }).json().status(200);
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  fetchMyOrders,
  fetchOrderCount,
};
