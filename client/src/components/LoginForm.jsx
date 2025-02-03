import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { register, login } from '../service/authApi';

// eslint-disable-next-line react/prop-types
const LoginForm = ({onLoginSuccess}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try{

            const { data } = await login(username, password);
            setMessage(data.message);
            setUsername('');
            setPassword('');

            setError('');
            onLoginSuccess(data);

        }catch(error){
            setUsername('');
            setPassword('');
            console.log('The error is: ', error);
            setError('Invalid username or password');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try{

            const { data } = await register(username, password);
            setIsRegister(false);
            setMessage(data.message);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('')

        }catch(error){
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            console.log('The error is: ', error);
            setMessage('')
            setError('Something went wrong during user registration');
        }
    };


    const usernameChange = (e) => {
        setUsername(e.target.value);
        setError('');
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4">
            <form onSubmit={isRegister ? handleRegister : handleLogin} 
                  className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                           w-full max-w-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                           animate-fadeIn">
                <div className="pt-8">
                    <h2 className="text-4xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                                 bg-clip-text text-transparent mb-2">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h2>
                </div>
                <hr className="w-1/4 mx-auto border-blue-200 my-4"/>
                <p className="text-center text-gray-600 text-lg font-normal px-4 mb-6">
                    {isRegister ? "Let's get you started" : "We are glad to see you again!"}
                </p>
                <div className="p-8">
                    <div className="space-y-6">
                        <div className="group">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                                </div>
                                <input 
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={usernameChange} 
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                             transition-all duration-200 hover:border-blue-500"
                                    placeholder="Enter Your Username" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                                </div>
                                <input 
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={passwordChange} 
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                             transition-all duration-200 hover:border-blue-500"
                                    placeholder="Enter Your Password" 
                                    required
                                />
                            </div>
                        </div>

                        {isRegister && (
                            <div className="group">
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                                    </div>
                                    <input 
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={confirmPasswordChange} 
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                 transition-all duration-200 hover:border-blue-500"
                                        placeholder="Enter Confirm Password" 
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg">
                                <FiAlertCircle className="flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        
                        {message && (
                            <div className="flex items-center space-x-2 text-green-500 bg-green-50 p-3 rounded-lg">
                                <FiCheckCircle className="flex-shrink-0" />
                                <p className="text-sm">{message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl
                                     font-medium hover:from-blue-700 hover:to-purple-700 
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                     transition-all duration-200 transform hover:scale-[1.02]">
                            {isRegister ? "Register" : "Login"}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                                <Link 
                                    to="" 
                                    onClick={() => setIsRegister(!isRegister)} 
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 
                                             font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                                    {isRegister ? "Login" : "Create Account"}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;