import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
});

const initialValues = {
  email: "",
};

/* form action schema {data, schema, formAction} */
const formAction = {
  submit: {
    title: "Reset Password",
    action: "submit",
  },
  clear: {
    title: "Clear",
    action: "reset",
  },
  cancel: {
    title: "Cancel",
    action: "cancel",
    to: "/user/login",
  },
};

export { validationSchema, initialValues, formAction }; 