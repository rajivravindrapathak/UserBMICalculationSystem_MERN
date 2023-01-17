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
        .then((res) => console.log(res))
    }


    return (
        <div>
            <h1>SignUp page</h1>
            <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
            <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>SignUp</button>
        </div>
    )
}

export default Login
