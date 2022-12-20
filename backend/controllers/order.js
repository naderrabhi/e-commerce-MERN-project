const Order = require('../models/order')

exports.addOrder = async (req, res) => {
    const newOrder = await new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.editOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new : true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
        res.status(500).send(error) 
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getOrder = async (req, res) => {
    try {
        const orders = await Order.find({userID: req.params.userID});
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getStatusOrder = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales:"$amount"
                },
            },
            {    
                $group: {
                        _id:"$month",
                        total:{$sum: "$sales"}
                    }
                
            }
        ])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}