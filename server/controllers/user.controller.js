const { CartModel } = require("../schemas/cart.schema");
const { UserModel } = require("../schemas/user.schema");

const register = async (req, res, next) => {
  try {
    const user = new UserModel(req.body);

    const userObj = await user.save();
    const cart = new CartModel({
      customer_id: userObj._id,
      items: [],
    });

    const cartObj = await cart.save();

    const updatedUserObj = await UserModel.findByIdAndUpdate(userObj._id, {
      cart_id: cartObj._id,
    });

    res.send(updatedUserObj);
  } catch (error) {
    next({ error });
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({
      username: username,
      password: password,
    });
    if (user) {
      res
        .send({
          id: user._id,
          cartId: user.cart_id,
        })
        .status(200)
        .json();
    } else {
      res
        .send({
          message: "User not found",
        })
        .json()
        .status(400);
    }
  } catch (error) {
    next({ error });
  }
};

module.exports = {
  register,
  authenticate,
};
