import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {

    const handleSubmit = () => {
        localStorage.removeItem("token")
    }

    return (
        <>
            <div className='mainDivLogout'>
                <h1>Logout page</h1>
                <Link to='/signup'><Button className='logoutbtn' onClick={handleSubmit}>Logout</Button></Link>
            </div>
        </>
    )
}

export default Logout
