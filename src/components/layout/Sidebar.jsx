// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//     const isOpen = useSelector((state) => state.ui.sidebarOpen);

//     return (
//         <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
//             <h3 className="logo">MyApp</h3>

//             <nav>
//                 <NavLink to="/dashboard" className="menu">
//                     Dashboard
//                 </NavLink>

//                 <NavLink to="/users-table" className="menu">
//                     Users
//                 </NavLink>
//                 <NavLink to="/movies" className="menu">
//                     Movies
//                 </NavLink>
//                 <NavLink to="/products" className="menu">
//                     Products
//                 </NavLink>
//                 <NavLink to="/products/card" className="menu">
//                     Cart
//                 </NavLink>
//             </nav>
//         </aside>
//     );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h3 className="logo">MyApp</h3>

      <nav>
        <NavLink to="/dashboard" className="menu">
          Dashboard
        </NavLink>

        <NavLink to="/users-table" className="menu">
          Users
        </NavLink>

        <NavLink to="/movies" className="menu">
          Movies
        </NavLink>

        <NavLink to="/products" className="menu">
          Products
        </NavLink>

        <NavLink to="/products/card" className="menu">
          Cart
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
