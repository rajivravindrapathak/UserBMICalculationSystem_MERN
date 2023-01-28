import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.module.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        const payload = {
            email,
            password
        }
        console.log(payload)
        fetch("http://localhost:8500/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("token", res.token)
            console.log(res.token)
        })
        alert('Login Successful Please Click On Ok To Further go and calculate BMI')
    }


    return (
        <div className='mainDivLogin'>
            <h1>Login page</h1>
            <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <Link to='/calculateBMI'><button className='loginbtn' onClick={handleSubmit}>Login</button></Link>
        </div>
        
    )
}

export default Login
