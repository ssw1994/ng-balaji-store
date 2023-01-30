const { ProductModel } = require("../schemas/products");
const fetchProducts = async (req, res, next) => {
  try {
    const data = await ProductModel.find();
    res.send({ data }).json().status(200);
  } catch (error) {
    next({ error });
  }
};

const addtoCart = async (req, res, next) => {
  try {
    const { id, item } = req.body;
    ProductModel.updateOne(
      { _id: id },
      { $push: { items: item } },
      (error, response) => {
        if (error) {
          next({ error });
        }
        res.send(response).json().status(200);
      }
    );
  } catch (error) {
    next({ error });
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { id, product_id } = req.body;
    ProductModel.updateOne(
      { _id: id },
      { $pull: { items: { product_id: product_id } } },
      (error, response) => {
        if (error) {
          next(error);
        }
        res.send(response).json().status(200);
      }
    );
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  fetchProducts,
  addtoCart,
  removeFromCart,
};
