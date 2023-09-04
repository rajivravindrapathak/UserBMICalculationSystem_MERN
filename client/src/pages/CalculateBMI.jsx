import { Button, Form } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CalculateBMI = () => {

    const [bmidata, setBmidata] = useState({
        height: '',
        weight: '',
        bmidata: []
    })

    const handleChange = (e) => {
        setBmidata({
            ...bmidata,
            [e.target.name]: e.target.value 
        })
    }

    const onFinish = async () => {
        try {
            const response = await axios.post('https://user-bmi-calculation-system-mern.vercel.app/calculateBMI', bmidata);
            console.log('data successful:', response.data);
            const { token } = response.data;
  
            // Store the token in local storage (you can use session storage as well)
            localStorage.getItem('token', token);
            // You can handle successful sign-up, show a success message, or redirect to another page.
          } catch (error) {
            console.error('data failed:', error.response.data);
            // You can handle sign-up errors, display an error message, or take appropriate actions.
          }
    }


    //     fetch("", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`
    //         },
    //         body : JSON.stringify(payload)
    //     })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log(res)
    //         setBmidata(res)
    //     })
    //     alert("You can achieve calculated BMI value")
    // }

    console.log(bmidata)

    return (
        
        <div className='mainDivCalculateBMI'>
            <h1>CalculateBMI page</h1>
            <Form onFinish={onFinish}>
                <Form.Item>
                    <input 
                        name='height'
                        type='text' 
                        value={bmidata.height}
                        placeholder='height in feet' 
                        onChange={handleChange} 
                    />
                    <input 
                        name='weight'
                        type='text' 
                        value={bmidata.weight}
                        placeholder='weight in kg' 
                        onChange={handleChange} 
                    />
                    <Button 
                        className='calculateBMIbtn' 
                        htmlType="submit" 
                    >
                        CalculateBMI
                    </Button>
                </Form.Item>
            </Form>
            
             <div>
                <br />
                <h1>BMI Value: { bmidata.BMI } </h1> 
            </div>
            <Link to='/logout'><Button className='calculateBMIbtn'>GoTOLogoutPage</Button></Link>
        </div>
    )
}

export default CalculateBMI
