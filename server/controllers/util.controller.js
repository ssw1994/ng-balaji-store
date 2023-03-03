const { ProductModel } = require("../schemas/products");

const getAllProductCategories = async (req, res, next) => {
  try {
    const categories = await ProductModel.aggregate([
      {
        $project: { category: 1 },
      },
      {
        $group: {
          _id: null,
          uniqueCategories: { $addToSet: "$category" },
        },
      },
    ]);
    res.send({ categories: categories[0].uniqueCategories }).json().status(200);
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  getAllProductCategories,
};
