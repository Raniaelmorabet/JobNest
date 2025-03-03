import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import EmployerDashboard from "./pages/EmployerDashboard";
import Preloader from "./components/ui/Preloader.jsx";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsLoaded(true);
            }, 2000);
        }, 9000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Preloader with dissolve effect */}
            {!isLoaded && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-[2000ms] ease-out ${
                        isFadingOut ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Preloader />
                </div>
            )}

            <div
                className={`flex flex-col min-h-screen transition-opacity duration-[2000ms] ease-out ${
                    isFadingOut ? "opacity-100" : "opacity-0"
                }`}
            >
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;