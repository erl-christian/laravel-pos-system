import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navnar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard(){

    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/")
        }
    },[])
    return(

        <div className="flex">

            <Sidebar/>

            <div className="flex-1">

                <Navbar/>

                <div className="p-8">

                    <h1 className="text-3xl font-bold"> Dashboard </h1>

                </div>

            </div>

        </div>

    );

}