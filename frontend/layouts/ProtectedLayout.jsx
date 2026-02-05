import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/");

  return children;
};

export default ProtectedLayout;
