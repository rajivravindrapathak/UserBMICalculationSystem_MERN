const express = require('express')
const cors = require("cors")
const {connection} = require("./config/db")
// const {UserModel} = require("./models/User.model")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {userController} = require("./routes/user.routes")
const { authentication } = require('./middlewares/authentication');
const { BMIModel } = require('./models/BMIModel');
require("dotenv").config()

const app = express()        
const PORT = process.env.PORT || 6002
 
app.use(cors())     
app.use(express.json())    

app.use("/", userController)

app.get('/', (req, res) => {
    res.status(500).send("bmi app")   
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
    // res.send("post successful")
})

// backened getCalculation api
app.get('/getCalculation', authentication, async (req, res) => {
    const {user_id} = req.body
    const all_bmi = await BMIModel.find({user_id : user_id})
    res.send({history : all_bmi})
})

app.listen(PORT, async () => {   
    try {
        await connection 
        console.log("connected to db")
    } catch (err) {
        console.log("not connected to db")
        console.log(err)
    }
    console.log(`listening on port ${PORT}`)
}) 