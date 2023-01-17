import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<h1>welcome to BMI app</h1>} />
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
