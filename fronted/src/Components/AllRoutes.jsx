import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CalculateBMI from './CalculateBMI'
import Login from './Login'
import SignUp from './SignUp'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<h1>welcome to BMI app</h1>} />
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/login' element={<Login />} />
                <Route path='/calculateBMI' element={<CalculateBMI />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
