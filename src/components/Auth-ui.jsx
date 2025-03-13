import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import image from "@/assets/Auth/image.png";

export default function AuthUI() {
  const [activeTab, setActiveTab] = useState("login");
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext

  // State for signup form
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    company_name: "",
    industry: "",
  });

  // State for login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for errors
  const [signupErrors, setSignupErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});

  // State for industries
  const [industries, setIndustries] = useState([
    {
      id: "753b8fba-b748-4ffd-acd7-3a4443258079",
      name: "industry"
    },
    {
      id: "89f772fd-19cc-4cd8-a593-4d58e80726bb",
      name: "Human Resources"
    },
    {
      id: "3aac0001-6c7f-48e3-9abd-04d42927b5a1",
      name: "Transportation & Logistics"
    },
    {
      id: "bb3ec10b-e8e6-410e-a70e-6dd4311f1c62",
      name: "Media & Entertainment"
    },
    {
      id: "829d0dde-221a-4ec0-a6fb-0b05d463cf49",
      name: "Sales & Marketing"
    },
    {
      id: "6dcca264-ad4d-48b3-b7f5-5fc744027837",
      name: "Education & Training"
    },
    {
      id: "4d84ca67-e27e-452f-bdce-c9d6e6c594fb",
      name: "Engineering & Manufacturing"
    },
    {
      id: "5e63af74-4fa7-48f8-96e2-6208bb4ed215",
      name: "Finance & Banking"
    },
    {
      id: "616b27c3-2b17-4f8b-baa2-585d05d88b27",
      name: "Healthcare & Medical"
    },
    {
      id: "54fa8578-3368-4bd4-93ab-f550213f3525",
      name: "Information Technology (IT)"
    }
  ]);
  const [error, setError] = useState("");

  // Fetch industries on component mount
  // useEffect(() => {
  //   fetchIndustries();
  // }, []);

  // const fetchIndustries = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch(
  //         "https://job-board-platform.onrender.com/api/industry/",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch industries");
  //     }

  //     const data = await response.json();
  //     setIndustries(); // Assuming the API returns an array of industries
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleTabChange = (tab) => {
    if (tab === activeTab || isAnimating) return;

    setIsAnimating(true);

    // Set slide direction based on which tab we're switching to
    if (tab === "signup") {
      setSlideDirection("right");
    } else {
      setSlideDirection("left");
    }

    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    return hasUppercase;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupErrors({});

    if (!validatePassword(signupData.password)) {
      setSignupErrors({ password: "Password must contain at least one uppercase letter" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://job-board-platform.onrender.com/api/auth/signup/ ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          email: signupData.email,
          password: signupData.password,
          role: signupData.role,
          ...(signupData.role === "employer" && {
            company_name: signupData.company_name,
            industry: signupData.industry,
          }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
      const data = await response.json();
      handleTabChange("login");
      // Handle successful signup (e.g., redirect to dashboard)
    } catch (error) {
      setSignupErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginErrors({});

    if (!validatePassword(loginData.password)) {
      setLoginErrors({ password: "Password must contain at least one uppercase letter" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://job-board-platform.onrender.com/api/auth/login/ ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      login(data.user, data.access_token);
    } catch (error) {
      setLoginErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-full min-h-screen bg-white">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col w-full p-6">
          {/* Image for mobile - shown on top */}
          <div className="relative w-full aspect-[4/3] mb-6">
            <img
                src={image}
                alt="People collaborating in an office"
                className="object-cover rounded-3xl"
            />
          </div>

          {/* Mobile Form */}
          <div
              className={`w-full space-y-6 transition-all duration-500 ease-in-out ${
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
          >
            {activeTab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
                    <p className="text-muted-foreground text-sm">
                      Sign in to explore opportunities and take the next step in your career
                    </p>
                  </div>

                  {loginErrors.server && (
                      <div className="text-red-500 text-sm">{loginErrors.server}</div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email-mobile" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                          id="email-mobile"
                          type="email"
                          placeholder="name@example.com"
                          className="rounded-lg h-12"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password-mobile" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                          id="password-mobile"
                          type="password"
                          placeholder="At least 8 characters"
                          className="rounded-lg h-12"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                      {loginErrors.password && (
                          <div className="text-red-500 text-sm">{loginErrors.password}</div>
                      )}
                      <div className="flex justify-end">
                        <Link href="#" className="text-xs text-muted-foreground hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg h-12 mt-2"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center text-xs text-muted-foreground my-6">
                    <Separator className="flex-1" />
                    <span className="mx-2">Or continue with</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-lg h-12 border-gray-200 bg-gray-50"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-lg h-12 border-gray-200 bg-gray-50"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                            fill="#1877F2"
                        />
                      </svg>
                      <span>Sign in with Facebook</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm mt-6">
                    Don&apos;t you have an account?{" "}
                    <button
                        onClick={() => handleTabChange("signup")}
                        className="font-medium text-blue-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
            ) : (
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Welcome 👋</h1>
                    <p className="text-muted-foreground text-sm">
                      Join our community and unlock endless opportunities
                    </p>
                  </div>

                  {signupErrors.server && (
                      <div className="text-red-500 text-sm">{signupErrors.server}</div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name-mobile" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                            id="first-name-mobile"
                            placeholder="Enter your name"
                            className="rounded-lg h-12"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name-mobile" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input
                            id="last-name-mobile"
                            placeholder="Enter your name"
                            className="rounded-lg h-12"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-email-mobile" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                          id="signup-email-mobile"
                          type="email"
                          placeholder="name@example.com"
                          className="rounded-lg h-12"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-password-mobile" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                          id="signup-password-mobile"
                          type="password"
                          placeholder="At least 8 characters"
                          className="rounded-lg h-12"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                      {signupErrors.password && (
                          <div className="text-red-500 text-sm">{signupErrors.password}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="role-mobile" className="text-sm font-medium">
                        I want to
                      </label>
                      <Select
                          defaultValue="user"
                          onValueChange={(value) => setSignupData({ ...signupData, role: value })}
                      >
                        <SelectTrigger className="rounded-lg h-12">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Find a Job</SelectItem>
                          <SelectItem value="employer">Hire Talent</SelectItem>
                          <SelectItem value="admin">Explore Opportunities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {signupData.role === "employer" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="company-name-mobile" className="text-sm font-medium">
                              Company Name
                            </label>
                            <Input
                                id="company-name-mobile"
                                placeholder="Enter your company"
                                className="rounded-lg h-12"
                                value={signupData.company_name}
                                onChange={(e) => setSignupData({ ...signupData, company_name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="industry-mobile" className="text-sm font-medium">
                              Industry
                            </label>
                            <Select
                                onValueChange={(value) => setSignupData({ ...signupData, industry: value })}
                            >
                              <SelectTrigger className="rounded-lg h-12">
                                <SelectValue placeholder="Select an industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industries.map((industry) => (
                                    <SelectItem key={industry.id} value={industry.name}>
                                      {industry.name}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg h-12 mt-2"
                    >
                      {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center text-xs text-muted-foreground my-6">
                    <Separator className="flex-1" />
                    <span className="mx-2">Or continue with</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-lg h-12 border-gray-200 bg-gray-50"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-lg h-12 border-gray-200 bg-gray-50"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                            fill="#1877F2"
                        />
                      </svg>
                      <span>Sign in with Facebook</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <button
                        onClick={() => handleTabChange("login")}
                        className="font-medium text-blue-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
            )}
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex w-full min-h-screen overflow-hidden">
          <div className="flex w-full relative">
            {/* Image Section */}
            <div
                className={`absolute w-1/2 h-full transition-transform duration-700 ease-in-out ${
                    slideDirection === "right" ? "translate-x-full" : "translate-x-0"
                }`}
                style={{ zIndex: 10 }}
            >
              <div className="relative w-full h-full">
                <img
                    src={image}
                    alt="People collaborating in an office"
                    className="object-cover rounded-lg h-[96.5%] m-4"
                />
              </div>
            </div>

            {/* Auth Forms Section - Left Side (Sign Up) */}
            <div
                className={`w-1/2 flex items-center justify-center p-8 lg:p-16 transition-opacity duration-700 ease-in-out ${
                    activeTab === "signup" && !isAnimating ? "opacity-100" : "opacity-0"
                }`}
                style={{ zIndex: activeTab === "signup" ? 20 : 0 }}
            >
              <div className="w-full max-w-md space-y-8">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Welcome 👋</h1>
                    <p className="text-muted-foreground">
                      Join our community and unlock endless opportunities
                    </p>
                  </div>

                  {signupErrors.server && (
                      <div className="text-red-500 text-sm">{signupErrors.server}</div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                            id="first-name"
                            placeholder="Enter your name"
                            className="rounded-md"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input
                            id="last-name"
                            placeholder="Enter your name"
                            className="rounded-md"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          className="rounded-md"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                          id="signup-password"
                          type="password"
                          placeholder="At least 8 characters"
                          className="rounded-md"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                      {signupErrors.password && (
                          <div className="text-red-500 text-sm">{signupErrors.password}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        I want to
                      </label>
                      <Select
                          defaultValue="user"
                          onValueChange={(value) => setSignupData({ ...signupData, role: value })}
                      >
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Find a Job</SelectItem>
                          <SelectItem value="employer">Hire Talent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {signupData.role === "employer" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="company-name" className="text-sm font-medium">
                              Company Name
                            </label>
                            <Input
                                id="company-name"
                                placeholder="Enter your company"
                                className="rounded-md"
                                value={signupData.company_name}
                                onChange={(e) => setSignupData({ ...signupData, company_name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="industry" className="text-sm font-medium">
                              Industry
                            </label>
                            <Select
                                onValueChange={(value) => setSignupData({ ...signupData, industry: value })}
                            >
                              <SelectTrigger className="rounded-md">
                                <SelectValue placeholder="Select an industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industries.map((industry) => (
                                    <SelectItem key={industry.id} value={industry.name}>
                                      {industry.name}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-md"
                    >
                      {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center text-xs text-muted-foreground">
                    <Separator className="flex-1" />
                    <span className="mx-2">Or continue with</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid gap-2">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-md"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-md"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                            fill="#1877F2"
                        />
                      </svg>
                      <span>Sign in with Facebook</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => handleTabChange("login")}
                        className="font-medium text-blue-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Auth Forms Section - Right Side (Sign In) */}
            <div
                className={`w-1/2 flex items-center justify-center p-8 lg:p-16 ml-auto transition-opacity duration-700 ease-in-out ${
                    activeTab === "login" && !isAnimating ? "opacity-100" : "opacity-0"
                }`}
                style={{ zIndex: activeTab === "login" ? 20 : 0 }}
            >
              <div className="w-full max-w-md space-y-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
                    <p className="text-muted-foreground">
                      Sign in to explore opportunities and take the next step in your career
                    </p>
                  </div>

                  {loginErrors.server && (
                      <div className="text-red-500 text-sm">{loginErrors.server}</div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="rounded-md"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                          id="password"
                          type="password"
                          placeholder="At least 8 characters"
                          className="rounded-md"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                      {loginErrors.password && (
                          <div className="text-red-500 text-sm">{loginErrors.password}</div>
                      )}
                      <div className="flex justify-end">
                        <Link to="#" className="text-xs text-muted-foreground hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-md"
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>

                  <div className="relative flex items-center justify-center text-xs text-muted-foreground">
                    <Separator className="flex-1" />
                    <span className="mx-2">Or continue with</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid gap-2">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-md"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 rounded-md"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg ">
                        <path
                            d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                            fill="#1877F2"
                        />
                      </svg>
                      <span>Sign in with Facebook</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Don&apos;t you have an account?{" "}
                    <button
                        onClick={() => handleTabChange("signup")}
                        className="font-medium text-blue-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}