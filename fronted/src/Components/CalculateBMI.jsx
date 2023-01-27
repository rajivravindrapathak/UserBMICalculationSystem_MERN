import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CalculateBMI = () => {

    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [data, setData] = useState([])

    const handleSubmit = () => {
        const payload = {
            height,
            weight
        }
        console.log(payload)
        fetch("http://localhost:8000/calculateBMI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            setData(res)
        })
        alert("You can achieve calculated BMI value")
    }

    console.log(data)

    return (
        
        <div>
            <h1>CalculateBMI page</h1>
            <input type='text' placeholder='height in feet' onChange={(e) => setHeight(e.target.value)} />
            <input type='text' placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)} />
            <button onClick={handleSubmit}>CalculateBMI</button>
            <Link to='/logout'><button>GoTOLogoutPage</button></Link>
            
             <div>
                <br />
                BMI Value: {data.BMI}
            </div>
        </div>
       
      
        
    )
}

export default CalculateBMI
