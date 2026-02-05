import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    toast.warning("Already Logged In", {
      autoClose: 1000,
      hideProgressBar: true,
      position: "bottom-right",
    });
    navigate("/");
    return;
  }

  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      toast.error(res.json.message);
      return;
    }
    const data = await res.json();
    login(data);
  };

  return (
    <div className="flex flex-col gap-8 h-dvh w-dvw items-center justify-center">
      <span className="text-2xl">Register</span>
      <form className="flex flex-col gap-4 text-xl">
        <span className="flex flex-col">
          <label htmlFor="email">Username</label>
          <input
            className="bg-neutral-700 rounded-sm outline-0 p-1 px-2"
            type="email"
            name="email"
            onChange={(e) => {
              setFormData({ ...formdata, email: e.target.value });
            }}
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="bg-neutral-700 rounded-sm outline-0 p-1 px-2"
            type="email"
            name="email"
            onChange={(e) => {
              setFormData({ ...formdata, email: e.target.value });
            }}
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="bg-neutral-700 rounded-sm outline-0 p-1 px-2"
            onChange={(e) => {
              setFormData({ ...formdata, password: e.target.value });
            }}
          />
        </span>
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-orange-300 mt-5 text-neutral-800 rounded-sm p-2"
        >
          Login
        </button>
      </form>
      <span>
        Already have an Account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default Register;
