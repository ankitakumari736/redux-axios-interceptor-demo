import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import "../Register/register.scss";


const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "Only letters and spaces allowed"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[a-z]/, "One lowercase required")
    .regex(/[0-9]/, "One number required")
    .regex(/[@$!%*?&]/, "One special character required"),
});


const Register = () => {
  const navigate = useNavigate();
  const { call, loading } = useApi(API_URLS.REGISTER);

  const validateWithZod = (values) => {
    const result = schema.safeParse(values);

    if (result.success) return {};

    const errors = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0]] = err.message;
    });

    return errors;
  };

  return (
    <div className="register-container">

      <div className="register-card">
        <h2>Register</h2>

        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            password: "",
          }}
          validate={validateWithZod}
          onSubmit={(values) => {
            call(values, () => {
              alert("Registered Successfully!");
              navigate("/login");
            });
          }}
        >

          <Form>

            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" component="p" />

            <Field name="phone" placeholder="Phone" />
            <ErrorMessage name="phone" component="p" />

            <Field name="email" placeholder="Email" />
            <ErrorMessage name="email" component="p" />

            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="p" />

            <button type="submit">
              {loading ? "Registering..." : "Register"}
            </button>

          </Form>

        </Formik>

      </div>

    </div>
  );
};

export default Register;
