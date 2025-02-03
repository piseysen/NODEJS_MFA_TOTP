import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {

    const navigate = useNavigate();
    const {login} = useSession();

    const handleLoginCuccess = (userData) => {
        console.log('The logged in userdata; ', userData);
        login(userData);

        console.log('userData.isMfaActive:', userData.isMfaActive);
        if(!userData.isMfaActive){
            navigate('/setup-2fa');
        }else{
            navigate('/verify-2fa')
        }
    };

    return (
        <LoginForm onLoginSuccess={handleLoginCuccess} />
    );
};

export default LoginPage;