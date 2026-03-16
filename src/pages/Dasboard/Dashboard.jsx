import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../app/userSlice";
import { setPageTitle } from "../../app/uiSlice";
import "./dashboard.scss";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list) || [];

  useEffect(() => {
    dispatch(setPageTitle("Dashboard"));
    dispatch(fetchUsers());
  }, [dispatch]);

    const breadcrumbItems = [
    { label: "Dashboard" },
  ];
  return (
        <Layout breadcrumb={breadcrumbItems}>

    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="kpi-grid">

        <div className="kpi-card blue">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="users"
            className="kpi-img"
          />
          <div>
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="kpi-card green">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="active users"
            className="kpi-img"
          />
          <div>
            <p>Active Users</p>
            <h2>{users.slice(0, 6).length}</h2>
          </div>
        </div>

        <div className="kpi-card orange">
          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
            alt="pending users"
            className="kpi-img"
          />
          <div>
            <p>Pending Users</p>
            <h2>{users.slice(6, 9).length}</h2>
          </div>
        </div>

      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
