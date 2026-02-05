import { MessageCircleDashed } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  return (
    <div className="z-50 backdrop-blur-xl flex justify-between p-5 fixed top-0 left-0 right-0">
      <Link className="flex items-center gap-1" to="/">
        <MessageCircleDashed size={32} strokeWidth={2} color="#ED944D" />
        <span className="text-2xl font-bold text-zinc-200">Channel</span>
      </Link>

      {user ? (
        <>
          <span
            onClick={() => setMenu(!menu)}
            className="cursor-pointer font-serif text-2xl"
          >
            {user.username}
          </span>
          {menu ? (
            <span
              className="absolute text-neutral-800 cursor-pointer right-8 rounded text-xl top-18 bg-orange-300 p-1 px-3"
              onClick={logout}
            >
              Logout
            </span>
          ) : null}
        </>
      ) : (
        <Link className="text-xl" to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
