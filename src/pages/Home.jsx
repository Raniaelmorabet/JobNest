import { useState, useEffect } from "react";
import { SearchForm } from "../components/SearchForm.jsx";
import { JobList } from "../components/JobList.jsx";
import HeroImage from "../assets/HeroPageImage/heroPage.png";
import Preloader from "../components/ui/Preloader.jsx";
import Dashboard from "@/components/DashBoard.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    country: "",
  });
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Check localStorage for the showIntro flag
  const showIntro = localStorage.getItem("showIntro") === "true";

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsLoaded(true);
          localStorage.setItem("showIntro", "false");
        }, 2000);
      }, 9000);
  
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
      setIsFadingOut(true); 
    }
  }, []);
  

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Preloader with dissolve effect */}
      {!isLoaded && showIntro && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-[2000ms] ease-out ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Preloader />
        </div>
      )}

      {/* Main Home content */}
      <div
        className={`transition-opacity ${
          userInfo.role === "employer" && "bg-[#0A0A0A]"
        } duration-[2000ms] ease-out ${
          isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-h-screen">
          <section className="relative text-white py-32 md:py-44">
            <div className="container relative z-10 px-4">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-6">
                  Discover Your Dream Career
                </h1>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                  Explore thousands of job opportunities with all the
                  information <br />
                  you need. It’s your future. Come find it. Manage all your job
                  applications <br /> from start to finish.
                </p>
                {userInfo.role === "user" ? (
                  <SearchForm onSearch={handleSearch} />
                ) : (
                  <Button onClick={() => {navigate("/dashboard")}} className={"rounded-full bg-white px-5 py-6 mt-10 md:mt-16 text-black border text-xl border-black shadow-sm hover:bg-[#0A0A0A] hover:text-white duration-300"}>
                    Manage your opportunities
                  </Button>
                )}
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={HeroImage}
                alt="Modern office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#000000C4]" />
            </div>
          </section>

          {userInfo.role === "user" && (
            <section className="bg-gray-50 py-16" id="jobList">
              <div className="container px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                  <h2 className="text-3xl font-semibold mb-4 md:mb-0">
                    Recommended jobs
                  </h2>
                </div>
                <section className="relative">
                  {userInfo.role === "user" ? (
                    <JobList filters={filters} />
                  ) : null}
                </section>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}