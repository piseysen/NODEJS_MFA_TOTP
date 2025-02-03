import React from "react";
import TwoFAVerification from "../components/TwoFAVerification";
import { useNavigate } from "react-router-dom";

const Verify2FAPage = () => {
    const navigate = useNavigate();

    const handleVerification = async (data) => {
        console.log('2FA Verification Complete', data);
        if(data){
            navigate('/');
        }
    };

    const handle2FAReset = async (data) => {
        if(data){
            navigate('/setup-2fa');
        }
    };

    return (
        <TwoFAVerification 
            onVerifySuccess={handleVerification} 
            onResetSuccess={handle2FAReset} />
    );
};

export default Verify2FAPage;