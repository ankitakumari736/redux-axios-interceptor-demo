import { useSelector } from "react-redux";
import SessionManager from "../Session/SessionManager";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CustomBreadcrumb from "../breadcrumb/CustomBreadcrumb";
import "./layout.scss";

const Layout = ({ children, breadcrumb = [] }) => {
  const isOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="app-layout">
      <SessionManager />

      <Sidebar />

      <div className={`main-container ${isOpen ? "expanded" : "collapsed"}`}>
        <Navbar />

        {breadcrumb.length > 0 && (
          <div className="breadcrumb-wrapper">
            <CustomBreadcrumb items={breadcrumb} />
          </div>
        )}

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;