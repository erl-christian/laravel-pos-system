import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.post("/login", { email, password });

            localStorage.setItem("token", res.data.token);

            alert("Log in Success");

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-50 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden mx-4">
                
                {/* Decorative top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>

                {/* Header Section */}
                <div className="mb-8 text-center sm:text-left">
                    <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20 mb-4 mx-auto sm:mx-0">
                        P
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-1">Please enter your credentials to access your terminal.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    
                    {/* Email Input Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </span>
                            <input 
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl p-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 bg-gray-50/50" 
                                placeholder="name@store.com" 
                            />
                        </div>
                    </div>

                    {/* Password Input Field */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Password
                            </label>
                            <a href="#forgot" className="text-xs font-medium text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl p-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 bg-gray-50/50" 
                                placeholder="••••••••" 
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 text-sm transition-all duration-150 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.99] mt-2"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Notice */}
                <div className="mt-8 pt-5 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        Authorized personnel only. Logs are recorded.
                    </p>
                </div>
            </div>
        </div>
    );
}