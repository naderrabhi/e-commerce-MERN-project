const User = require('../models/user');
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

exports.editUser = async (req,res) => {
    if (req.body.password) {req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.privateKey).toString()}
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new : true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getAllUser = async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find({});
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getStatsUser = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}