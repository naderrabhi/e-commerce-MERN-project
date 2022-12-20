const Cart = require('../models/cart')

exports.addCart = async (req, res) => {
    const newCart = await new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.editCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new : true})
        res.status(200).json(updatedCart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
}

exports.deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userID: req.params.userID});
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getAllCart = async (req, res) => {
    try {
        const carts = await Cart.find({})
        res.status(200).json(carts)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}