import React from "react";
import TwoFASetup from "../components/TwoFASetup";
import { useNavigate } from "react-router-dom";

const Setup2FAPage = () => {

    const navigate = useNavigate();

    const handleSetupComplete = () => {
        console.log('2FA Setup Complete');
        navigate('/verify-2fa');
    };

    return (
        <TwoFASetup onSetupComplete={handleSetupComplete}/>
    );
};

export default Setup2FAPage;