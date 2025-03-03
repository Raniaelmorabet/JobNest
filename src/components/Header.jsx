import { Link, useLocation } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import NavLogo from "../assets/NavBarLogo/logo1.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    console.log("Logging out...");
    // Add actual logout logic here
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hasHeroSection = location.pathname === "/" || location.pathname === "/employer/dashboard";

  return (
      <header
          className={`${
              isScrolled || !hasHeroSection ? "bg-black" : "bg-transparent"
          } text-white py-4 fixed top-0 left-0 w-full z-50 border-b-[0.5px] border-b-white/50 transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="w-10">
              <img src={NavLogo} alt="NavLogo" />
            </Link>
            <nav className="hidden md:flex items-center space-x-32">
              <Link to="/jobs" className="text-sm hover:text-blue-400 transition-colors">
                Find Jobs
              </Link>
              <Link to="/upload" className="text-sm hover:text-blue-400 transition-colors">
                Upload Jobs
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&auto=format&fit=crop&q=60" />
                    <AvatarFallback>FC</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/employer/dashboard">Employer Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout} className="text-red-600">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {isMenuOpen && (
              <nav className="mt-4 md:hidden ">
                <Link to="/jobs" className="block py-2 transition-colors">
                  Find Jobs
                </Link>
                <Link to="/upload" className="block py-2 transition-colors">
                  Upload Job
                </Link>
              </nav>
          )}
        </div>
      </header>
  );
}