import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blog from "../pages/Blog";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Create from "../pages/Create";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blog/:slug" element={<Blog />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/create" element={<Create />}></Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        toastStyle={{ backgroundColor: "#3e3e3e", color: "white" }}
        hideProgressBar={true}
        position="bottom-right"
        autoClose={2000}
      />
    </>
  );
};

export default App;
