import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navnar";

export default function Dashboard(){

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