const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct,
    addToWishlist, rating, uploadImages, deleteImages} = require("../controller/productCtrl");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.put(
    "/upload/:id",
     authMiddleware,
     isAdmin, 
     uploadPhoto.array('images', 10),
     productImgResize,
     uploadImages
 );
router.delete(
     "/delete-img/:id", 
     authMiddleware, 
     isAdmin, 
     deleteImages);



module.exports = router;