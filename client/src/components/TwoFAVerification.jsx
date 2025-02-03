import React, { useState } from 'react';
import { verify2FA, reset2FA } from '../service/authApi';
import { FiShield, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

// eslint-disable-next-line react/prop-types
const TwoFAVerification = ({onVerifySuccess, onResetSuccess}) => {

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleTokenVerification = async (e) => {
        e.preventDefault();
        try{
            const { data } = await verify2FA(otp);
            onVerifySuccess(data);
        }catch(error){
            setOtp('');
            console.log('The error is: ', error);
            setError('Invalid TOTP');
        }
    };

    const handleReset2FA = async () => {
        try{
            const { data } = await reset2FA();
            onResetSuccess(data);
        }catch(error){
            console.log('The error is: ', error);
            setError('Something went wrong during 2FA reset');
        }
    };

    const handl2FAChange = (e) => {
        console.log('The OTP is: ', e.target.value);
        setOtp(e.target.value);
        setError('');
    };


    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <form onSubmit={handleTokenVerification} 
                  className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                            w-full max-w-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                            animate-fadeIn p-8">
                <div className="flex flex-col items-center mb-8">
                    <FiShield className="w-16 h-16 text-blue-600 mb-4" />
                    <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                                 bg-clip-text text-transparent">
                        Verify Your Identity
                    </h2>
                    <p className="text-center text-gray-600 text-lg mt-4 max-w-sm">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="group">
                        <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-2">
                            Authentication Code
                        </label>
                        <div className="relative">
                            <input 
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={handl2FAChange}
                                maxLength="6"
                                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl
                                         text-center text-2xl font-mono tracking-[1em] text-gray-700
                                         transition-all duration-200 hover:border-blue-500
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="······"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg animate-fadeIn">
                            <FiAlertCircle className="flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                                     py-3 px-6 rounded-xl font-medium
                                     hover:from-blue-700 hover:to-purple-700
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                     transition-all duration-200 transform hover:scale-[1.02]
                                     flex items-center justify-center gap-2">
                            <FiShield className="w-5 h-5" />
                            Verify Code
                        </button>

                        <button
                            type="button"
                            onClick={handleReset2FA}
                            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium
                                     hover:bg-gray-200
                                     focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                                     transition-all duration-200
                                     flex items-center justify-center gap-2">
                            <FiRefreshCw className="w-5 h-5" />
                            Reset 2FA
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Having trouble? Contact support for assistance
                    </p>
                </div>
            </form>
        </div>
    );
};

export default TwoFAVerification;