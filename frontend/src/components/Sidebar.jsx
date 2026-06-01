import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClasses = (path) => `
        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive(path) 
            ? "bg-blue-600 text-white shadow-md shadow-blue-900/30" 
            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
        }
    `;

    return (
        <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col border-r border-slate-800 sticky top-0">
            {/* Branding / Logo Header */}
            <div className="flex items-center gap-3 px-2 mb-8 mt-2">
                <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
                    P
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-none tracking-tight">Apex POS</h1>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">v1.2.0</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5 flex-1">
                <Link to="/dashboard" className={linkClasses("/dashboard")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                    </svg>
                    Dashboard
                </Link>

                <Link to="/products" className={linkClasses("/products")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Products
                </Link>

                <Link to="/inventory" className={linkClasses("/inventory")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Inventory
                </Link>
            </nav>

            {/* User Profile Info Footer inside Sidebar */}
            <div className="border-t border-slate-800 pt-4 px-2 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                    AD
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">Admin User</p>
                    <p className="text-xs text-slate-500 truncate">admin@store.com</p>
                </div>
            </div>
        </div>
    );
}