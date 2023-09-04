const { Router } = require("express")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {UserModel} = require("../models/User.model"); 
const { authentication } = require("../middlewares/authentication");

const userController = Router()

// backened signup api
userController.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    // if user already signup it means user alrady exits please try login
    const isUser = await UserModel.findOne({email})
    if(isUser) {
        res.send({"msg" : "user already exits please login"})
    }
    else {
        bcryptjs.hash(password, 4, async function(err, hash) {
            if(err) {
                console.log(err)
                res.send("something went wrong, please try again", err)
            } 
            else {
                const new_user = new UserModel({  
                    username,
                    email,    
                    password : hash
                })
            
                try {
                    await new_user.save()
                    res.send({"msg" : "sign up successfull"})
                } catch(err) {
                    res.send({"msg" : "something went wrong, please try again"})
                }
            }
        });
    }
})         

// backend login api
userController.post("/login", async (req, res) => {   
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const user_id = user._id   
    console.log(user)
    console.log(user_id)
    bcryptjs.compare(password, hashed_password, function(err, result) {
        if(err) {
            res.send({"msg": "something went wrong, please try again later"})
        }
        if(result) {
            const token = jwt.sign({user_id}, process.env.SECRET_KEY)
            res.send({message : "login successful", token})
        } else {
            res.send({"msg" : "login failed"})
        }  
    });  
})


// backened getprofile api
userController.get('/getProfile', authentication, async (req, res) => {
    const { user_id } = req.body
    const user =  await UserModel.findOne({_id: user_id})
    const {name, email} = user
    res.send({name, email})
})

module.exports = { userController }