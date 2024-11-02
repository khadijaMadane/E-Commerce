const express = require("express");
const { createUser, loginUserCtrl, getallUser, getaUser,
     deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken,
     logout, updatePassword, forgotPasswordController, resetPassword,
     forgotPasswordToken,loginAdmin, getWishlist, saveAddress, userCart,
     getUserCart, emptyCart, applyCoupon, createOrder, getOrders,
     updateOrderStatus,removeFromWishlist,
     removeProductFromCart,updateProductQuantityFromCart,} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { paymentVerification, checkout } = require("../controller/paymentCtrl");
const router = express.Router();

router.post("/register", createUser);

router.get('/verify-email/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.send('Email verified successfully. You can now log in.');
  } catch (error) {
    res.status(400).send('Invalid token');
  }
});













router.post("/forgot-password-token", forgotPasswordToken);
router.post("/forgot-password", forgotPasswordController);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/logout", logout);

/*router.put(
     "/order/update-order/:id",
     authMiddleware,
     isAdmin,
     updateOrderStatus
   );*/

router.get("/wishlist", authMiddleware, getWishlist);
router.delete('/wishlist/:id', authMiddleware,removeFromWishlist);

router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.post("/cart/create-order", authMiddleware, createOrder);

router.post("/cart",  authMiddleware, userCart);

router.get("/cart",  authMiddleware, getUserCart);
/*router.delete("/empty-cart", authMiddleware, emptyCart);*/
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

/*router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.get("/get-orders", authMiddleware, getOrders);*/

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;