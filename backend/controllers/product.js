const Product = require('../models/product')

exports.addProduct = async (req, res) => {
    const newProduct = await new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.editProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new : true})
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getAllProduct = async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if (qNew) {
            products = await Product.find({}).sort({createdAt : -1}).limit(5)
        } else if (qCategory) {
            products = await Product.find({categories: {
                $in: [qCategory]
            }})
        }else {
            products = await Product.find({})
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}