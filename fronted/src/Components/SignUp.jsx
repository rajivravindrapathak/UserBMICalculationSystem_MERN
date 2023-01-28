import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignUp.module.css'

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        const payload = {
            name,
            email,
            password
        }
        console.log(payload)
        fetch("http://localhost:8500/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
        alert('SignUp Successful Please Click On Ok To Further go and calculate BMI')
    }


    return (
        <div className='mainDivSignUp'>
            <h1>SignUp page</h1>
            <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} /><br/>
            <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br/>
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br/>
            <Link to='/login'><button className='signUpbtn' onClick={handleSubmit}>SignUp</button></Link>
        </div>
    )
}

export default SignUp
