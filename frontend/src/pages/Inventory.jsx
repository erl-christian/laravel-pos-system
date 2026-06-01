import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../services/api";


export default function Inventory(){

    const [inventory, setInventory] = useState([])

    useEffect(() => {
        async function loadInventory() {
            try {
                const res = await api.get("/inventory")

                setInventory(res.data)

            } catch (error) {
                console.log(error)
            }
        }

        loadInventory()
    },[])

    return(

        <div className="flex">

        <Sidebar/>

        <div className="p-8 flex-1">

        <h1 className="text-3xl font-bold mb-6">

            Inventory

        </h1>

        <table className="w-full border">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>

            <tbody>
                {inventory.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                            </tr>
                        ))}
            </tbody>
        </table>

        </div>

        </div>

    );

}