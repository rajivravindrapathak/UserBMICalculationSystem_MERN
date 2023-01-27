import React from "react";
import { Link } from "react-router-dom";
import './HomePage.module.css'

const HomePage = () => {

    return ( 
        <div>
            <div className="mainDiv">
                <h1>welcome to BMI app</h1>
                <div className="subDiv">
                        <Link to='/signup'><button className="btn">SignUp</button></Link>
                        <Link to='/login'><button className="btn">Login</button></Link>
                </div>
            </div>
        </div>
     );
}
 
export default HomePage;