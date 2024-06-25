const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");



const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    const newUser = new User(req.body);
    const verificationToken = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    const verificationURL = `http://localhost:3000/verify-email/${verificationToken}`;
    const message = `
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationURL}">Click here to verify your email</a>
    `;

    await sendEmail({
      to: newUser.email,
      subject: "Email Verification",
      html: message,
    });

    res.json({ message: "User created. Please check your email to verify your account." });
  } else {
    res.status(400);
    throw new Error("User Already Exists");
  }
});
/*const createUser = asyncHandler(async (req, res) => {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            //create a new user
          const newUser = await User.create(req.body);
          res.json(newUser);
        } else {
            throw new Error("User Already Exists");
        }
});*/
// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
    // Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
const { email, password } = req.body;
// check if user exists or not
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
    findUser.id,
    {
        refreshToken: refreshToken,
    },
    { new: true }
    );

  
    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
    });
res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: generateToken(findUser?._id),
    });
} else {
    throw new Error("Invalid Credentials");
}
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("Aucun token de rafraîchissement dans les cookies");
    }
    
    const refreshToken = cookie.refreshToken;
    
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.status(401).json({ message: "Session expirée. Veuillez vous reconnecter." });
    }

    // Construire le filtre pour trouver l'utilisateur par refreshToken
    const filter = { refreshToken: refreshToken };

    // Mettre à jour le refreshToken de l'utilisateur pour le vider
    await User.findOneAndUpdate(filter, { refreshToken: "" });

    // Supprimer le cookie refreshToken de la réponse
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    
    res.status(200).json({ message: "log out" });


    // try {
    //     res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
    //     return res.json({msg: "Logged Out"})
    // } catch (err) {
    //     return res.status(500).json({msg: err.message})   
    // }
  });

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
  });
  const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          address: req?.body?.address,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });
// Get all users

const getallUser = asyncHandler(async (req, res) => {
    try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
});

// Get a single user

const getaUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  // Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  // Update a user

  const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          mobile: req.body.mobile,
        },
        {
          new: true, // Pour retourner l'objet mis à jour
        }
      );
  
      if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const blockusr = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json(blockusr);
    } catch (error) {
      throw new Error(error);
    }
  });
  //unblock user
  const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
     validateMongoDbId(id);
  
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User UnBlocked",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  // updatepassword
  const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });
  // forgot password
  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        htm: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const forgotPasswordController =asyncHandler(async (req, res) => {
    try {
      const { email, mobile, newPassword } = req.body;
  
      if (!email) {
        res.status(400).send({ message: "Email is required!" });
      }
  
      if (!mobile) {
        res.status(400).send({ message: "Answer is required!" });
      }
  
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required!" });
      }
  
      // Check
      const user = await User.findOne({ email, mobile });
  
      // Validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email or Answer",
        });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something Went Wrong",
        error,
      });
    }
  });

  const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  });
  
  const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
      const user = await User.findById(_id).populate("wishlist");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user.wishlist);
    } catch (error) {
      throw new Error(error);
    }
  });




  const removeFromWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
  
    if (user) {
      user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== req.params.id
      );
      await user.save();
      res.status(200).json(user.wishlist); // Renvoie la wishlist mise à jour
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  
  //cart 
  const userCart = asyncHandler(async (req, res) => {
    const { productId,color,quantity,price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      // Check if the product already exists in the user's cart
      let existingCartItem = await Cart.findOne({ userId: _id, productId, color });

      if (existingCartItem) {
          // Update the existing cart item
          existingCartItem.quantity += quantity;
          existingCartItem.price = price; // Optional: update the price if it has changed
          await existingCartItem.save();
          res.json(existingCartItem);
      } else {
          // Create a new cart item
          let newCart = await new Cart({
              userId: _id,
              productId,
              color,
              price,
              quantity
          }).save();
          res.json(newCart);
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

  
  const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const cart = await Cart.find({ userId: _id }).populate("productId").populate("color");
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    validateMongoDbId(_id);
    try {
        const deleteProductFromCart = await Cart.findOneAndDelete({ userId: _id, _id: cartItemId });
        if (!deleteProductFromCart) {
          res.status(404).json({ message: "Product not found in cart" });
        }
        res.json({ message: "Product removed from cart" });
    } catch (error) {
        throw new Error(error);
    }
});
const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(newQuantity);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async(req, res)=>{
  const {shippingInfo,orderItems, totalPrice, totalPriceafterDiscount, paymentInfo } = req.body;
  const { _id} =req.user;
  try{
      const order =await Order.create({
        shippingInfo, orderItems,totalPrice, totalPriceafterDiscount, paymentInfo ,user: _id
      })
      res.json({
        order,
        success:true
      })
  } catch (error) {
    throw new Error(error)
  }
})

  /*const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const user = await User.findOne({ _id });
      const cart = await Cart.findOneAndDelete({ orderby: user._id });
      res.json(cart);
    } catch (error) {
      throw new Error(error);
    }
  });
  const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
      orderby: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderby: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
  });
  //orders
  const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      if (!COD) throw new Error("Create cash order failed");
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({ orderby: user._id });
      let finalAmout = 0;
      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmout = userCart.totalAfterDiscount;
      } else {
        finalAmout = userCart.cartTotal;
      }
  
      let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmout,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "usd",
        },
        orderby: user._id,
        orderStatus: "Cash on Delivery",
      }).save();
      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
      res.json({ message: "success" });
    } catch (error) {
      throw new Error(error);
    }
  });
  const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const userorders = await Order.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });

  const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
      res.json(updateOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  });   */

  
  

module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    forgotPasswordController,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    createOrder,
    removeProductFromCart,
    updateProductQuantityFromCart,
    updatedUser,
    removeFromWishlist,
};