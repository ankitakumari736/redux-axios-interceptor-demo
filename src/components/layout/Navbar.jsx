import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.ui.pageTitle);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("sessionExpiry");
  navigate("/login");
};
    return (
        <header className="navbar">
            <h3>{title}</h3>
            <button onClick={handleLogout} className="logout-btn">
  Logout
</button>
        </header>
    );
};

export default Navbar;
