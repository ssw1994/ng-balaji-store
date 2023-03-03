const { CartModel } = require("../schemas/cart.schema");
const { UserModel } = require("../schemas/user.schema");
const nodemailer = require("nodemailer");
const { VerificationModal } = require("../schemas/verifications.schema");
const { default: mongoose } = require("mongoose");
const sendEmailForVerification = function (email, token) {
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ssw.esachin1994@gmail.com",
      pass: "hfnihrtwopbywwfk",
    },
  });

  const verificationUrl =
    "http://localhost:5000/api/users/verify?token=" + token;

  var mailOptions = {
    from: "balaji_store@gmail.com",
    to: email,
    subject: "Email-verification : balaji_store.com",
    html: `<h1>Verify your email address</h1>
          <p> Click <a href="${verificationUrl}">Verify me</a></p>`,
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return 0;
    }
  });
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.query["token"];

    await VerificationModal.findOneAndUpdate(
      {
        token: mongoose.Types.ObjectId(token),
      },
      {
        isVerified: true,
      }
    );

    res
      .send(
        '<h3>Email Verified Successfully please,click here to Login <a href="/login">Login</a></h3>'
      )
      .status(200);
  } catch (error) {
    res
      .send("<h3>Error in email verification , please try again later...!</h3>")
      .status(400);
  }
};

const checkUserVerification = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({ username: username });
    const verificationUser = await VerificationModal.findOne({
      email: user.email,
    });

    if (!verificationUser.isVerified) {
      res
        .send({
          message: "User is not verified yet",
        })
        .status(401)
        .json();
    }
    next();
  } catch (error) {
    res.send({ error });
  }
};

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
    const { email, _id } = updatedUserObj;
    try {
      const verification = new VerificationModal({
        email: email,
        token: _id,
        isVerified: false,
      });
      await verification.save();
      await sendEmailForVerification(email, _id);
    } catch (error) {
      res.send({ error });
    }

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
  verifyEmail,
  checkUserVerification,
};
