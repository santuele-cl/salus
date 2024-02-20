import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),
});

export const RegisterSchema = yup.object().shape({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),
});
