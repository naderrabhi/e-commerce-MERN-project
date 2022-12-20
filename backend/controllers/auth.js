const User = require('../models/user');
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req,res) => {
    const { username,email,password} = req.body
    try {
        const newUser = await new User({
            username : username,
            email : email,
            password : CryptoJS.AES.encrypt(password, process.env.privateKey).toString()
        })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.loginUser = async (req,res) => {
    
    try {
        const user = await User.findOne({ email : req.body.email})

        if (!user) {return res.status(401).json("Wrong credentials!")}

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.privateKey)

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (originalPassword !== req.body.password) {return res.status(401).json("Wrong credentials!")}

        const accessToken = jwt.sign({id : user._id, isAdmin : user.isAdmin}, process.env.privateKey,{expiresIn : "3d"})
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}