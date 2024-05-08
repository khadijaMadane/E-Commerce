const router = require('express').Router();

 const productCtrl = require('../controllers/productCtrl')
// const auth = require('../middlewares/auth')
// const authAdmin = require('../middlewares/authAdmin')

router.route('/products')
.get(productCtrl.getProducts)
.post(productCtrl.createProduct)

router.route('/products/:id')
.delete(productCtrl.deleteProduct)
.put(productCtrl.updateProduct)


module.exports = router;