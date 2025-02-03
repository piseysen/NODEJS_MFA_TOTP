import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FAPage from "./pages/Setup2FA";
import Verify2FAPage from "./pages/Verify2FA";
import ProtectedRoute from "./components/ProtectedRoute";


export const router = createBrowserRouter([

    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: '/setup-2fa',
                element: <Setup2FAPage />,
                errorElement: <Error />
            },
            {
                path: '/verify-2fa',
                element: <Verify2FAPage />,
                errorElement: <Error />
            }
        ]
    }


]);