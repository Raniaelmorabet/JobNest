import { useEffect, ReactNode } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";
import JobDetailsEmployer from "./components/JobDetailsEmployer";
import Error from "@/components/Error";
import React from "react";

function App(): JSX.Element {
    const location = useLocation();
    const { token, user } = useAuth();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // ProtectedRoute component
    const ProtectedRoute = ({
                                children,
                            }: {
        children: ReactNode;
    }): JSX.Element => {
        if (!token || !user) {
            return <Navigate to="/auth" replace />;
        }
        return <>{children}</>;
    };

    const ProtectedAdmin = ({
                                children,
                            }: {
        children: ReactNode;
    }): JSX.Element => {
        if (!user || JSON.parse(user).role != "employer") {
            return <Navigate to="/" replace />;
        }
        return <>{children}</>;
    };

    const ProtectedUser = ({
                               children,
                           }: {
        children: ReactNode;
    }): JSX.Element => {
        if (!user || JSON.parse(user).role != "user") {
            return <Navigate to="/dashboard" replace />;
        }
        return <>{children}</>;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <ProtectedUser>
                                    <Home />
                                </ProtectedUser>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/jobs/:id"
                        element={
                            <ProtectedRoute>
                                <JobDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <ProtectedAdmin>
                                    <DashboardPage />
                                </ProtectedAdmin>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/jobs/:id"
                        element={
                            <ProtectedRoute>
                                <ProtectedAdmin>
                                    <JobDetailsEmployer />
                                </ProtectedAdmin>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
            {location.pathname === "/auth" ? "" : <Footer />}
        </div>
    );
}

export default App;