import React, { useState } from 'react'

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
        alert("Bmi")
    }

    console.log(data)

    return (
        
        <div>
            <h1>CalculateBMI page</h1>
            <input type='text' placeholder='height in feet' onChange={(e) => setHeight(e.target.value)} />
            <input type='text' placeholder='weight in kg' onChange={(e) => setWeight(e.target.value)} />
            <button onClick={handleSubmit}>CalculateBMI</button>
            
        </div>
       
            // <div>
            //     { 
            //         data.map((e) => {
            //             return (
            //                 <div key={e.id}>
            //                     <div>{e.BMI}</div>
            //                 </div>
            //             )
            //         }) 
            //     } 
            // </div>
      
        
    )
}

export default CalculateBMI
