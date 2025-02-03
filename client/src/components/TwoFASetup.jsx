import React, {useState, useEffect} from 'react';
import { setup2FA } from '../service/authApi';
import { FiCopy, FiCheckCircle, FiShield } from 'react-icons/fi';

// eslint-disable-next-line react/prop-types
const TwoFASetup = ({onSetupComplete}) => {
    const [response, setResponse] = useState({});
    const [message, setMessage] = useState('');
    const [copying, setCopying] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchORCode = async () => {
        try {
            setLoading(true);
            const {data} = await setup2FA();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchORCode();
    }, []);

    const copyClipBoard = async () => {
        await navigator.clipboard.writeText(response.secret);
        setCopying(true);
        setMessage('Secret copied to clipboard');
        setTimeout(() => {
            setCopying(false);
            setMessage('');
        }, 2000);
    };

    return(
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                          w-full max-w-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                          animate-fadeIn p-8">
                <div className="flex flex-col items-center mb-8">
                    <FiShield className="w-16 h-16 text-blue-600 mb-4" />
                    <h2 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                                 bg-clip-text text-transparent">
                        Two-Factor Authentication
                    </h2>
                    <p className="text-center text-gray-600 text-lg mt-4 max-w-sm">
                        Enhance your account security by setting up 2FA verification
                    </p>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-6">
                            {response.qrCode && (
                                <div className="p-4 bg-white rounded-xl shadow-inner">
                                    <img 
                                        src={response.qrCode} 
                                        alt="QR Code" 
                                        className="rounded-lg transition-all duration-300 hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="w-full">
                                <div className="flex items-center gap-4 my-4">
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                    <span className="text-gray-500 text-sm font-medium">OR ENTER CODE MANUALLY</span>
                                    <div className="h-px bg-gray-200 flex-1"></div>
                                </div>

                                <div className="relative group">
                                    <input 
                                        readOnly 
                                        value={response.secret || ''}
                                        className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl
                                                 text-sm font-mono tracking-wider text-gray-700 cursor-pointer
                                                 transition-all duration-200 hover:bg-gray-100"
                                        onClick={copyClipBoard}
                                    />
                                    <button 
                                        onClick={copyClipBoard}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2
                                                 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                        {copying ? <FiCheckCircle className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
                                    </button>
                                </div>
                                
                                {message && (
                                    <p className="text-center text-sm text-green-500 mt-2 animate-fadeIn">
                                        {message}
                                    </p>
                                )}
                            </div>

                            <button 
                                onClick={onSetupComplete}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                                         py-3 px-6 rounded-xl font-medium
                                         hover:from-blue-700 hover:to-purple-700
                                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                         transition-all duration-200 transform hover:scale-[1.02]
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         flex items-center justify-center gap-2">
                                <FiShield className="w-5 h-5" />
                                Continue to Verification
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwoFASetup;