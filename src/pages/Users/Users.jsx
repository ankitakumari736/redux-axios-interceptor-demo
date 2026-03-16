// // import Layout from "../../components/layout/Layout";
// // import UserTable from "../../components/table/UserTable";
// // import EditUserForm from "../../components/editform/EditUserForm";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useEffect, useState } from "react";
// // import { setPageTitle } from "../../app/uiSlice";
// // import { fetchUsers, deleteUser, updateUser } from "../../app/userSlice";

// // const Users = () => {
// //   const dispatch = useDispatch();
// //   const { list = [], loading, error } = useSelector((state) => state.users);

// //   const [selectedUser, setSelectedUser] = useState(null);

// //   useEffect(() => {
// //     dispatch(setPageTitle("Users"));
// //     dispatch(fetchUsers());
// //   }, [dispatch]);

// //   const columns = [
// //     { header: "Name", accessor: "name" },
// //     { header: "Email", accessor: "email" },
// //     { header: "Company", accessor: (row) => row.company?.name || "—" },
// //     { header: "City", accessor: (row) => row.address?.city || "—" },
// //   ];

// //   const handleDelete = (id) => {
// //     if (window.confirm("Delete user?")) {
// //       dispatch(deleteUser(id));
// //     }
// //   };

// //   const handleEdit = (user) => {
// //     setSelectedUser(user);
// //   };

// //   const handleSave = (updatedUser) => {
// //     dispatch(updateUser(updatedUser));
// //     setSelectedUser(null);
// //   };

// //   return (
// //     <Layout>

// //       <UserTable
// //         columns={columns}
// //         data={list}
// //         loading={loading}
// //         error={error}
// //         onDelete={handleDelete}
// //         onEdit={handleEdit}
// //       />

// //       {selectedUser && (
// //         <div className="modal-backdrop">

// //           <EditUserForm
// //             user={selectedUser}
// //             onSave={handleSave}
// //             onCancel={() => setSelectedUser(null)}
// //           />

// //         </div>
// //       )}

// //     </Layout>
// //   );
// // };

// // export default Users;
// import UserTable from "../../components/table/UserTable";
// import EditUserForm from "../../components/editform/EditUserForm";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { setPageTitle } from "../../app/uiSlice";
// import { fetchUsers, deleteUser, updateUser } from "../../app/userSlice";

// const Users = () => {
//   const dispatch = useDispatch();
//   const { list = [], loading, error } = useSelector((state) => state.users);

//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     dispatch(setPageTitle("Users"));
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const columns = [
//     { header: "Name", accessor: "name" },
//     { header: "Email", accessor: "email" },
//     { header: "Company", accessor: (row) => row.company?.name || "—" },
//     { header: "City", accessor: (row) => row.address?.city || "—" },
//   ];

//   const handleDelete = (id) => {
//     if (window.confirm("Delete user?")) {
//       dispatch(deleteUser(id));
//     }
//   };

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//   };

//   const handleSave = (updatedUser) => {
//     dispatch(updateUser(updatedUser));
//     setSelectedUser(null);
//   };

//   return (
//     <>
//       <UserTable
//         columns={columns}
//         data={list}
//         loading={loading}
//         error={error}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//       />

//       {selectedUser && (
//         <div className="modal-backdrop">
//           <EditUserForm
//             user={selectedUser}
//             onSave={handleSave}
//             onCancel={() => setSelectedUser(null)}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Users;
