// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import useApi from "../../api/useApi";
// import { API_URLS } from "../../api/apiUrls";
// import { loginSuccess } from "../../app/authSlice";

// import "./login.scss";

// const Login = () => {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { call, loading } = useApi(API_URLS.LOGIN);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     call(form, (res) => {

//       // dispatch(
//       //   loginSuccess({
//       //     token: res.data.token,
//       //     email: form.email,
//       //   })
//       // );

//       // localStorage.setItem("token", res.data.token);
//  const dummyToken =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmFtZSI6IkFua2l0YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDEyMDB9.dummySignature1234567890";

// dispatch(
//   loginSuccess({
//     token: dummyToken,
//     email: form.email,
//   })
// );

// localStorage.setItem("token", dummyToken);
// const TEN_MINUTES = 10 * 60 * 1000;
// localStorage.setItem("sessionExpiry", Date.now() + TEN_MINUTES);
//       navigate("/products");
//     });
//   };

//   return (
//     <div className="login-container">

//       <div className="login-card">
//         <h2>Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button onClick={handleSubmit} disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import { loginSuccess } from "../../app/authSlice";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { call, loading } = useApi(API_URLS.LOGIN);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    call(form, () => {
      const dummyToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmFtZSI6IkFua2l0YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwMDEyMDB9.dummySignature1234567890";

      dispatch(
        loginSuccess({
          token: dummyToken,
          email: form.email,
        })
      );

      localStorage.setItem("token", dummyToken);

      const TEN_MINUTES = 40 * 60 * 1000;
      localStorage.setItem("sessionExpiry", Date.now() + TEN_MINUTES);

      navigate("/products");
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;