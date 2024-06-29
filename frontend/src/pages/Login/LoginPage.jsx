import React from "react";
import LoginComp from "../../components/LoginComp/LoginComp";
import './LoginPage.css'
import booknest from '../../assets/images/booknest.jpg'
const LoginPage = () => {
    return (
        <React.Fragment>
            <div className="form-body">
                <img src={booknest}></img>
                <LoginComp />
            </div>
        </React.Fragment>
    )
}

export default LoginPage