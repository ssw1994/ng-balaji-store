//total cart items
db.carts.aggregate([
  { $match: { _id: ObjectId("63df99587069f1890c37089b") } },
  { $project: { items: 1 } },
  { $unwind: "$items" },
  { $group: { _id: null, count: { $sum: 1 } } },
]);

//Query for fetching cart items using join with products
db.carts.aggregate([
  { $match: id },
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
    },
  },
  { $project: { items: 0, product_details: 0 } },
]);

//clear user cart
db.carts.updateOne(
  { _id: ObjectId("63fdba7392d354a2572b2277") },
  { $set: { items: [], updated_at: new Date(), total_price: 0 } }
);

//remote item from cart

db.carts.deleteOne(
  {
    _id: ObjectId("63e7cee56c49e3eeedce8503"),
  },
  {
    $pull: {
      items: { _id: ObjectId("63df979d5084adbd7da542d0") },
    },
  }
);
