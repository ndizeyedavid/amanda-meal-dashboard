import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import ForgetPassword from "./pages/ForgetPassword";
import Settings from "./pages/Settings";
import ProgressBar from "./components/ProgressBar";


function App() {


  return (
    <BrowserRouter>
      <ProgressBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;