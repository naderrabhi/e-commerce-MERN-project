const { editUser, deleteUser, getUser, getAllUser, getStatsUser } = require('../controllers/user');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middlewares/verifyToken');

const router = require('express').Router();

router.put("/:id",verifyTokenAndAuthorization, editUser)
router.delete("/:id", verifyTokenAndAdmin, deleteUser)
router.get("/find/:id", verifyTokenAndAdmin, getUser)
router.get("/", verifyTokenAndAdmin, getAllUser)
router.get("/stats", verifyTokenAndAdmin, getStatsUser)

module.exports = router