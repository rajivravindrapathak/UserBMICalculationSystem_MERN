import { Button, Col, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

    return ( 
        <>
            <Layout className="mainDiv">
                <h1>welcome to BMI app</h1>
                <Row gutter={[0, 0]}>
                    <Col span={12} className="male-col" >
                        male
                    </Col>
                    <Col span={12} className="male-col" >
                        Female
                    </Col>
                </Row>
                <div className="subDiv">
                    <Link to='/signup'><Button type="primary">SignUp</Button></Link>
                    <Link to='/login'><Button type="primary">Login</Button></Link>
                </div>  
                
            </Layout>
        </>
     );
}
 
export default HomePage;