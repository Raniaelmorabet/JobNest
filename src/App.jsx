// App.js
import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import the useAuth hook
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import EmployerDashboard from "./pages/EmployerDashboard";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";
import JobDetailsEmployer from "./components/JobDetailsEmployer";

function App() {
  const location = useLocation();
  const { token, user } = useAuth();


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    if (!token || !user) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };

  const ProtectedAdmin = ({ children }) => {
    if (!user || JSON.parse(user).role === "employer") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route index path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedAdmin>
                <Home />
              </ProtectedAdmin>
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
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetailsEmployer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {location.pathname === "/auth" ? "": <Footer /> }
    </div>
  );
}

export default App;
