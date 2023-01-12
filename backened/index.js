const express = require('express')
const {connection} = require("./config/db")
const {UserModel} = require("./models/UserModel")

const app = express()

app.use(express.json())

app.get((req, res) => {
    res.send("hello")
})

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body
    // console.log(name, email, password)
    const new_user = ({
        name,
        email,
        password
    })
    await new_user.save()
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