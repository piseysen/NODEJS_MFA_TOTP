import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { logoutUser } from '../service/authApi';


const HomePage = () => {

    const navigate = useNavigate();
    const {user, logout} = useSession();

    const handleLogout = async () => {
        try{
            //navigate('/login');
            const {data} = await logoutUser();
            logout(data);
            navigate('/login');
        }catch(error){
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                console.error('Error logging out. Please try again.');
            }
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.username}!</h2>
            <p>You have successfully logged in and verified your 2FA</p>
            <button 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default HomePage;