import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Profile from "../screens/Profile";




const Rutas =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/perfil" element={<Profile/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas;