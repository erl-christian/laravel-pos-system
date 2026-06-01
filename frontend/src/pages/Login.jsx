export default function Login(){

    return(

        <div className=" h-screen flex justify-center items-center">

            <div className=" w-96 shadow rounded p-6 ">

                <h1 className=" text-2xl font-bold mb-4 " > Login </h1>

                <input  className=" border w-full p-2 mb-3 " placeholder="Email" />

                <input type="password" className=" border w-full p-2 mb-4 " placeholder="Password" />

                <button className=" bg-blue-600 text-white w-full p-2 rounded " > Login </button>

            </div>

        </div>

    );

}