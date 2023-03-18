const { CartModel } = require("../schemas/cart.schema");
const { ProductModel } = require("../schemas/products");
const { default: mongoose } = require("mongoose");

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
    console.log(item);
    const data = await CartModel.findByIdAndUpdate(
      mongoose.Types.ObjectId(id),
      {
        $push: { items: item },
        $inc: {
          total_price: item.price,
        },
      },
      { new: true }
    );
    res.send({ data }).json().status(200);
  } catch (error) {
    console.log(error);
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

const fetchProductsDetails = async (req, res, next) => {
  try {
    const id = req.query["id"];
    if (id) {
      const data = await ProductModel.findById(id);
      res.send({ data }).json().status(200);
    } else {
      res
        .send({
          message: "No product found with id" + id,
        })
        .json()
        .status(404);
    }
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  fetchProducts,
  addtoCart,
  removeFromCart,
  fetchProductsDetails,
};
