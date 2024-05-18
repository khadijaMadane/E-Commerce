const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");
const createUser = asyncHandler(async (req, res) => {
        const email = req.body.email;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            //create a new user
          const newUser = await User.create(req.body);
          res.json(newUser);
        } else {
            throw new Error("User Already Exists");
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
  
// Get all users

const getallUser = asyncHandler(async (req, res) => {
    try {
    const getUsers = await User.find();  
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
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
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
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
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
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    forgotPasswordController,
    resetPassword,
};