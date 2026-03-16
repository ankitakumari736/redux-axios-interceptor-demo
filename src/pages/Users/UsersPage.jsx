import { useEffect, useState } from "react";
import CustomUsersTable from "../../components/table/CustomUsersTable";
import { API_URLS } from "../../api/apiUrls";
import { usersAxios } from "../../api/axiosInstance";
import Layout from "../../components/layout/Layout";

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await usersAxios({
        url: API_URLS.GET_USERS.url,
        method: API_URLS.GET_USERS.method,
      });

      setUsers(response?.users || []);

    } catch (error) {
      console.log("Users Fetch Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users" }
  ];

  return (
    <Layout breadcrumb={breadcrumbItems}>
      <div style={{ padding: "2rem" }}>
        <h2>Users</h2>

        <CustomUsersTable
          columns={columns}
          data={users}
          loading={loading}
        />

      </div>
    </Layout>
  );
};

export default UsersPage;
