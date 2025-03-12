import { useState, useEffect } from "react";
import { JobDashboard } from "@/components/job-dashboard";
import Preloader from "@/components/ui/Preloader";

export default function DashboardPage(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Check localStorage for the showIntro flag
  const showIntro: boolean = localStorage.getItem("showIntro") === "true";

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
  }, [showIntro]);

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

        {/* Main Dashboard content */}
        <div
            className={`transition-opacity duration-[2000ms] ease-out ${
                isFadingOut ? "opacity-100" : "opacity-0"
            }`}
        >
          <JobDashboard />
        </div>
      </>
  );
}