export default function Navbar() {
    return (
        <div className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
            {/* Left side: Context / Breadcrumb */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">System</span>
                <span className="text-gray-300">/</span>
                <span className="text-sm font-medium text-gray-700">Admin Dashboard</span>
            </div>

            {/* Right side: Modern Utilities */}
            <div className="flex items-center gap-4">
                {/* Branch / Station Status pill */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Terminal 01 Online
                </div>

                {/* Notifications Icon Button */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {/* Tiny Notification indicator dot */}
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                </button>
            </div>
        </div>
    );
}