import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Reusable function to quickly refresh the product data grid
    async function refreshProducts() {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.log("Error refreshing products:", error);
        }
    }

    // COMBINED FETCH: Ensures both endpoints resolve before removing the loading spinner
    useEffect(() => {
        let isMounted = true; 
        
        async function fetchInitialData() {
            try {
                // Fire both API calls simultaneously for faster page load speeds
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get("/products"),
                    api.get("/categories")
                ]);

                if (isMounted) {
                    setProducts(productsRes.data);
                    setCategories(categoriesRes.data);
                }
            } catch (error) {
                console.log("Error loading initial data:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false); // Fires safely exactly once!
                }
            }
        }

        fetchInitialData();
        return () => { isMounted = false; };
    }, []);

    async function createProduct(e) {
        if (e && e.preventDefault) e.preventDefault(); 
        if (!sku || !name || !price || !categoryId) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await api.post("/products", {
                sku,
                name,
                price,
                category_id: categoryId
            });

            alert("Product Added successfully!");
            await refreshProducts(); 
            
            // Clear inputs smoothly
            setSku("");
            setName("");
            setPrice("");
            setCategoryId("");
        } catch (error) {
            console.log(error.response?.data || error);
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Sidebar />

            <div className="p-10 flex-1 max-w-7xl mx-auto w-full">
                {/* Header section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your store inventory and real-time stock pricing.</p>
                </div>

                {/* Modern Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Product</h2>
                    <form onSubmit={createProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU Code</label>
                            <input 
                                type="text"
                                placeholder="e.g. PROD-101" 
                                value={sku}
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                onChange={(e) => setSku(e.target.value)} 
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</label>
                            <input 
                                type="text"
                                placeholder="Item Name" 
                                value={name}
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price (PHP)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-sm text-gray-400">₱</span>
                                <input 
                                    type="number"
                                    step="0.01" // Allows decimal points inside form submissions
                                    placeholder="0.00" 
                                    value={price}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 pl-7 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                            <select 
                                value={categoryId}
                                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 text-sm transition-colors shadow-sm shadow-blue-100 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Table Layout Control Section */}
                {isLoading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center py-20">
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                        <p className="text-sm text-gray-500 font-medium">Loading products list...</p>
                    </div>
                ) : products.length === 0 ? (
                    /* Empty State Layout */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="text-lg font-semibold text-gray-900">No products found</p>
                        <p className="text-sm text-gray-400 mt-1">Add products to your system or refresh to update inventory lists.</p>
                    </div>
                ) : (
                    /* Product Inventory Matrix Card */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-mono text-gray-600 font-medium">{product.sku}</td>
                                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.name}</td>
                                            <td className="py-4 px-6 text-sm font-semibold text-blue-600">
                                                ₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="py-4 px-6 text-sm">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {product.category?.name || "Uncategorized"}
                                                </span>
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