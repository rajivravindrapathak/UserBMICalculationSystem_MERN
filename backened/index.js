const express = require('express')
const {connection} = require("./config/db")
const {UserModel} = require("./models/UserModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authentication } = require('./middlewares/authentication');
require("dotenv").config()

const app = express()

app.use(express.json())

app.get((req, res) => {
    res.send("hello")
})

// backened signup

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body

    const isUser = await UserModel.findOne({email})
    if(isUser) {
        res.send("user already exits please loggin")
    }
    bcrypt.hash(password, 4, async function(err, hash) {
        if(err) {
            res.send("something went wrong, please try again")
        } 
        else {
            const new_user = new UserModel({
                name,
                email,
                password : hash
            })
        
            try {
                await new_user.save()
                res.send("sign successful")
            } catch(err) {
                res.send("something went wrong, please try again")
            }
        }
    });

})

// backend login

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const user_id = user._id
    console.log(user)
    console.log(user_id)
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(err) {
            res.send("something went wrong, please try again later")
        }
        if(result) {
            const token = jwt.sign({user_id}, process.env.SECRET_KEY)
            res.send({message : "login successful", token})
        } else {
            res.send("login failed")
        }
    });
})

app.get('/getProfile', authentication, async (req, res) => {
    const { user_id } = req.body
    const user =  await UserModel.findOne({_id: user_id})
    console.log(user)
    res.send("a")
})

app.listen(8000, async () => {
 
    try {
        await connection
        console.log("connection to database success")
    } catch (err) {
        console.log("not connect to batabase")
        console.log(err)
    }
    console.log("listning on port 8000")
})