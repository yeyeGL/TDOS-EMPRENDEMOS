import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";




const Rutas =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas;