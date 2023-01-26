import React, { useState } from 'react'

const Logout = () => {

    const handleSubmit = () => {
        localStorage.removeItem("token")
    }

    return (
        <div>
            <h1>Logout page</h1>
            <button onClick={handleSubmit}>Logout</button>
        </div>
    )
}

export default Logout
