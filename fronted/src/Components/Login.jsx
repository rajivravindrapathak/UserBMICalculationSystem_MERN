import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        const payload = {
            email,
            password
        }
        console.log(payload)
        fetch("http://localhost:8000/login", {
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
    }


    return (
        <div>
            <h1>Login page</h1>
            <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login
