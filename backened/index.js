const express = require('express')
const cors = require("cors")
const {connection} = require("./config/db")
const {UserModel} = require("./models/UserModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { authentication } = require('./middlewares/authentication');
const { BMIModel } = require('./models/BMIModel');
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.get((req, res) => {
    res.send("hello")
})

// backened signup api
app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body
    // if user already signup it means user alrady exits please try login
    const isUser = await UserModel.findOne({email})
    if(isUser) {
        res.send({"msg" : "user already exits please login"})
    }
    else {
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
                    res.send({"msg" : "sign up successfull"})
                } catch(err) {
                    res.send({"msg" : "something went wrong, please try again"})
                }
            }
        });
    }
})

// backend login api
app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    const user_id = user._id
    console.log(user)
    console.log(user_id)
    bcrypt.compare(password, hashed_password, function(err, result) {
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
app.get('/getProfile', authentication, async (req, res) => {
    const { user_id } = req.body
    const user =  await UserModel.findOne({_id: user_id})
    const {name, email} = user
    res.send({name, email})
})

//  backened calculateBMI api
app.post('/calculateBMI', authentication, async (req, res) => {
    const {height, weight, user_id} = req.body
    const height_in_meter = +(height)*0.3048
    const BMI = +(weight)/(height_in_meter)** 2 
    const new_bmi = new BMIModel({
        BMI,
        height: height_in_meter, 
        weight,
        user_id 
    })
    await new_bmi.save()
    res.send({BMI}) 
})

// backened getCalculation api
app.get('/getCalculation', authentication, async (req, res) => {
    const {user_id} = req.body
    const all_bmi = await BMIModel.find({user_id : user_id})
    res.send({history : all_bmi})
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