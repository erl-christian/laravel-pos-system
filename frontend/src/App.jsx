import { BrowserRouter, Routes, Route} from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Inventory from "./pages/Inventory"
import History from "./pages/History"

function App (){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/inventory/history" element={<History/>}/>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App; 