const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
const cors = require('cors')
app.use(express.json())

app.use(cors())

const users = [
    {
        id: 1,
        username: "rakhazufar",
        password: "rahasiabanget"
    },
    {
        id: 2,
        username: "userkeren",
        password: "rahasiadong"
    }
]

app.post("/api/login", (req, res)=>{
    const {username, password} = req.body;
    const user = users.find(u=>{
        return u.username === username && u.password === password
    })
    if(user) {
        const accessToken = jwt.sign({username, password}, "sangatamatrahasia")
        res.json({
            username: user.username,
            accessToken
        })
    } else {
        res.status(400).json("user not found")
    }

})

app.listen(5000, ()=>{
    console.log('backend server is running!')
})