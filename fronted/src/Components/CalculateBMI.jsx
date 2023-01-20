import React, { useState } from 'react'

const CalculateBMI = () => {

    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")

    const handleSubmit = () => {
        const payload = {
            height,
            weight
        }
        console.log(payload)
        fetch("http://localhost:8000/calculateBMI", {
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
            <h1>CalculateBMI page</h1>
            <input type='text' placeholder='height in feet' onChange={(e) => setHeight(e.target.value)} />
            <input type='text' placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)} />
            <button onClick={handleSubmit}>CalculateBMI</button>
        </div>
    )
}

export default CalculateBMI
