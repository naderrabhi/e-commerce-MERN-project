const { addProduct, editProduct, deleteProduct, getProduct, getAllProduct } = require('../controllers/product');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post("/", verifyTokenAndAdmin, addProduct)
router.put("/:id", verifyTokenAndAdmin, editProduct)
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)
router.get("/find/:id", getProduct)
router.get("/", getAllProduct)

module.exports = router