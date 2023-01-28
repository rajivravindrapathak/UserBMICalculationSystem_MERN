import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Logout.module.css'

const Logout = () => {

    const handleSubmit = () => {
        localStorage.removeItem("token")
    }

    return (
        <div className='mainDivLogout'>
            <h1>Logout page</h1>
            <Link to='/signup'><button className='logoutbtn' onClick={handleSubmit}>Logout</button></Link>
        </div>
    )
}

export default Logout
