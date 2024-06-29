import React from "react";
import LoginComp from "../../components/LoginComp/LoginComp";
import './LoginPage.css'
const LoginPage = () => {
    return (
        <React.Fragment>
            <div className="form-body">
                <LoginComp />
            </div>
        </React.Fragment>
    )
}

export default LoginPage