require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 
const { User } = require('../models')

exports.register = async (req, res) => {
    if(await User.findOne({ where: { email: req.body.email }}) != null){
        res.status(409).send("Email already registered")
    }
    else{
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
            await User.create({
                email: req.body.email,
                password: hashedPassword
            })
        }
        catch {
            res.sendStatus(500)
        }
    }
}

exports.login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email }})

    if(user == null){
        res.status(400).send("User with this email does not exist")
    }
    else{
        try{
            if(await bcrypt.compare(req.body.password, user.password)){
                const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accessToken: accessToken })
            }
            else{
                res.status(401).send("Incorrect password")
            }
        }
        catch{
            res.sendStatus(500)
        }
    }
}