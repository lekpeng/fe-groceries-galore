import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import { Home } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/confirm/:emailToken" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
