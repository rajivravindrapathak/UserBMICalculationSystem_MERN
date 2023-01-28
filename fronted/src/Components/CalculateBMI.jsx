import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CalculateBMI.module.css'

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
        fetch("http://localhost:8500/calculateBMI", {
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
        
        <div className='mainDivCalculateBMI'>
            <h1>CalculateBMI page</h1>
            <input type='text' placeholder='height in feet' onChange={(e) => setHeight(e.target.value)} />
            <input type='text' placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)} />
            <button className='calculateBMIbtn' onClick={handleSubmit}>CalculateBMI</button>
            
             <div>
                <br />
                <h1>BMI Value:</h1> {data.BMI}
            </div>

            <Link to='/logout'><button className='calculateBMIbtn'>GoTOLogoutPage</button></Link>

        </div>
       
      
        
    )
}

export default CalculateBMI
