const express = require('express')
const {connection} = require("./config/db")
const {UserModel} = require("./models/UserModel")
const bcrypt = require('bcrypt');

const app = express()

app.use(express.json())

app.get((req, res) => {
    res.send("hello")
})

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body

    const isUser = await UserModel.findOne({email})
    if(isUser) {
        res.send("user already exits please loggin")
    }
    bcrypt.hash(password, 4, async function(err, hash) {
        if(err) {
            res.send("something went wrong, please try again")
        } else {
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