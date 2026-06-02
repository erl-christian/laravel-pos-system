import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

export default function History() {
    const [movements, setMovements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch history data when component loads
    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await api.get("/inventory/history");
                setMovements(res.data);
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadHistory();
    }, []);

    // Helper to format date strings into something readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        /* 1. Global Flex Container to separate the Sidebar from Content */
        <div className="flex min-h-screen bg-gray-50">
            
            {/* Sidebar sits nicely on the left side */}
            <Sidebar />

            {/* 2. Main content wrapper taking up the remaining horizontal space */}
            <div className="flex-1 p-8">
                
                {/* 3. The card content holding the data table */}
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-100">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Inventory Movement History</h2>
                            <p className="text-sm text-gray-500 mt-1">A real-time ledger of all incoming and outgoing stock adjustments.</p>
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center py-20">
                        <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                            <p className="text-sm text-gray-500 font-medium">Loading History...</p>
                        </div>
                    ) : movements.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg font-medium">No stock history recorded yet.</p>
                            <p className="text-sm text-gray-400 mt-1">Perform a "Stock In" action to see data populate here.</p>
                        </div>
                    ) : (
                        /* History Data Table */
                        <div className="overflow-x-auto mt-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100">
                                        <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Date & Time</th>
                                        <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Product Details</th>
                                        <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Movement Type</th>
                                        <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Quantity</th>
                                        <th className="py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {movements.map((movement) => (
                                        <tr key={movement.id} className="hover:bg-gray-50/30 transition-colors">
                                            {/* Date Column */}
                                            <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">
                                                {formatDate(movement.created_at)}
                                            </td>

                                            {/* Product Details Column */}
                                            <td className="py-4 px-6">
                                                <div className="text-sm font-medium text-gray-900">{movement.product?.name || 'Unknown Product'}</div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5">SKU: {movement.product?.sku || 'N/A'}</div>
                                            </td>

                                            {/* Movement Type Badges */}
                                            <td className="py-4 px-6">
                                                {movement.type === 'stock_in' ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                        Stock In
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                                                        Stock Out
                                                    </span>
                                                )}
                                            </td>

                                            {/* Quantity Column */}
                                            <td className="py-4 px-6 text-sm text-right">
                                                <span className={`font-bold text-lg ${movement.type === 'stock_in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {movement.type === 'stock_in' ? '+' : '-'}{movement.quantity}
                                                </span>
                                            </td>

                                            {/* Remarks Column */}
                                            <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">
                                                {movement.remarks || <span className="italic text-gray-300">No remarks available</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}