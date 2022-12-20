const { addOrder, editOrder, deleteOrder, getOrder, getAllOrder, getStatusOrder } = require('../controllers/order');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/verifyToken');

const router = require('express').Router();

router.post("/",verifyToken,addOrder)
router.put("/:id",verifyTokenAndAdmin,editOrder)
router.delete("/:id",verifyTokenAndAdmin,deleteOrder)
router.get("/find/:userID",verifyTokenAndAuthorization,getOrder)
router.get("/",verifyTokenAndAdmin,getAllOrder)
router.get("/income",verifyTokenAndAdmin,getStatusOrder)

module.exports = router