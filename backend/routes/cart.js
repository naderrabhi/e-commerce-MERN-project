const { addCart, editCart, deleteCart, getCart, getAllCart } = require('../controllers/cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post("/",verifyToken,addCart)
router.put("/:id",verifyTokenAndAuthorization,editCart)
router.delete("/:id",verifyTokenAndAuthorization,deleteCart)
router.get("/find/:userID",verifyTokenAndAuthorization,getCart)
router.get("/",verifyTokenAndAdmin,getAllCart)

module.exports = router