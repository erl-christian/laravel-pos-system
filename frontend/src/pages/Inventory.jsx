import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Inventory(){
    const [inventory, setInventory] = useState([])
    const [productid, setProductId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        let isMounted = true 
        
        async function loadInventory() {
            try {
                const res = await api.get("/inventory")
                if (isMounted) {
                    setInventory(res.data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                if (isMounted) {
                    setIsLoading(false); // Only update loading state if component is still mounted
                }
            }
        }

        loadInventory()
        
        return () => { isMounted = false }
    }, [refreshKey])

    async function stockin(e) {
        if (e) e.preventDefault()
        
        // Prevent submission if fields are empty
        if (!productid || !quantity) {
            alert("Please select a product and enter a quantity.");
            return;
        }
        
        try {
            await api.post("/stock-in", {
                product_id: productid,
                quantity: quantity,
            })

            alert("Stock Added Successfully")

            setProductId("")
            setQuantity("")
            
            setRefreshKey(prev => prev + 1) 

        } catch (error) {
            console.log(error)
        }
    } // 👈 THIS WAS MISSING! Added the missing closing curly brace for the stockin function.

    return (
       <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Sidebar />

            <div className="p-10 flex-1 max-w-7xl mx-auto w-full">
                
                {/* Header & Stock In Section */}
                <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Stock Inventory</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor real-time stock quantities, pricing, and fulfillment alerts.</p>
                    </div>
                    
                    {/* Stock In Card Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex-1 lg:max-w-xl">
                        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                            Quick Stock In
                        </h2> 
                        <form onSubmit={stockin} className="flex flex-col sm:flex-row gap-3">
                            <select
                                value={productid}
                                onChange={(e) => setProductId(e.target.value)}
                                className="border border-gray-200 p-2.5 rounded-lg text-sm bg-gray-50 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Product</option>
                                {inventory.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                placeholder="Quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="border border-gray-200 p-2.5 rounded-lg text-sm bg-gray-50 sm:w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm"
                            >
                                Stock In
                            </button>
                        </form>
                    </div>
                </div>

                {/* Modern Data Table Container */}
                {isLoading ? (
                   <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center py-20">
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                        <p className="text-sm text-gray-500 font-medium">Loading Inventory list...</p>
                    </div>
                ) : inventory.length === 0 ? (
                    /* Empty State Layout */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-lg font-semibold text-gray-900">No products found</p>
                        <p className="text-sm text-gray-400 mt-1">Add products to your system or refresh to update inventory lists.</p>
                    </div>
                ) : (
                    /* Data Table Card */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100">
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit Price</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Status</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {inventory.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                                            {/* Product Title */}
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                                {item.name}
                                            </td>
                                            
                                            {/* Price Formatting */}
                                            <td className="py-4 px-6 text-sm font-semibold text-gray-600">
                                                ₱{item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>
                                            
                                            {/* Stock Status Text Badges */}
                                            <td className="py-4 px-6 text-sm">
                                                {item.stock === 0 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                                                        Out of Stock
                                                    </span>
                                                )}
                                                {item.stock > 0 && item.stock <= 10 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                        Low Stock 
                                                    </span>
                                                )}
                                                {item.stock > 10 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                        In Stock 
                                                    </span>
                                                )}
                                            </td>

                                            {/* Dynamic Large Quantity Badges */}
                                            <td className="py-4 px-6 text-sm">
                                                {item.stock === 0 && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-lg font-bold bg-red-50 text-red-700 border border-red-100">
                                                        0
                                                    </span>
                                                )}
                                                {item.stock > 0 && item.stock <= 10 && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-lg font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                                                        {item.stock}
                                                    </span>
                                                )}
                                                {item.stock > 10 && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-lg font-semibold bg-green-50 text-green-700 border border-green-100">
                                                        {item.stock}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}