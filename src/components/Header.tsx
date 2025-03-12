import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavLogo from "../assets/NavBarLogo/logo1.png";
import ValidationModal from "./ValidationModal";

interface UserInfo {
  role: string;
}

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [validationModalOpen, setValidationModalOpen] = useState<boolean>(false);
  const location = useLocation();
  const userInfo: UserInfo | null = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("showIntro");
    navigate("/auth");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasHeroSection: boolean = location.pathname === "/" || location.pathname === "/employer/dashboard";
  const noHeader: boolean = location.pathname === "/auth";

  const handleNavigateToJobs = (): void => {
    if (userInfo?.role === "user") {
      if (location.pathname === "/") {
        document.getElementById("jobList")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById("jobList")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      setValidationModalOpen(true);
    }
  };

  const handleNavigateToUpload = (): void => {
    if (userInfo?.role === "employer") {
      navigate("/dashboard");
    } else {
      setValidationModalOpen(true);
    }
  };

  return (
      <>
        {!noHeader && (
            <header
                className={`${isScrolled || !hasHeroSection ? "bg-black" : "bg-transparent"} text-white ${isMenuOpen ? "pt-4" : "py-4"} fixed top-0 left-0 w-full z-50 border-b-[0.5px] border-b-white/50 transition-colors duration-300`}
            >
              <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="w-10">
                  <img src={NavLogo} alt="NavLogo" />
                </Link>
                <nav className="hidden md:flex items-center space-x-32">
                  <div onClick={handleNavigateToJobs} className="text-sm hover:text-green-400 transition-colors cursor-pointer">
                    Find Jobs
                  </div>
                  <div onClick={handleNavigateToUpload} className="text-sm hover:text-green-400 transition-colors cursor-pointer">
                    Upload Jobs
                  </div>
                </nav>
                <div className="flex items-center space-x-4">
                  <button onClick={handleLogout} className="text-white hidden md:flex items-center gap-3 ">
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                  <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`overflow-hidden bg-black md:hidden ${isMenuOpen ? "mt-4 py-2" : ""}`}
              >
                <div onClick={handleNavigateToJobs} className="block py-2 px-4 transition-colors cursor-pointer hover:text-[#16813D] duration-300">
                  Find Jobs
                </div>
                <div onClick={handleNavigateToUpload} className="block py-2 px-4 transition-colors cursor-pointer hover:text-[#16813D] duration-300">
                  Upload Job
                </div>
                <div onClick={handleLogout} className="flex gap-2 py-2 px-4 transition-colors cursor-pointer hover:text-green-400 duration-300">
                  Logout
                </div>
              </motion.nav>
            </header>
        )}

        {validationModalOpen && <ValidationModal onClose={() => setValidationModalOpen(false)} />}
      </>
  );
}