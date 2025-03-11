import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const Error = () => {
    const { logout } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Oops! Page not found.</h2>
            <p className="mt-2 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/auth" onClick={logout} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Go to Login
            </Link>
        </div>
    );
};

export default Error;
