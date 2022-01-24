import { watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
  const { value: email, errorMessage: errorEmail } = useField("email");
  const { value: name, errorMessage: errorName } = useField("name");
  const { value: lastName, errorMessage: errorLastName } = useField("lastName");
  const { value: password, errorMessage: errorPassword } = useField("password");

  const { errors, validate, values } = useForm({
    validationSchema: yup.object({
      email: yup
        .string()
        .required(() => "check the email field.")
        .email(() => "Check the email field."),
      name: yup.string().required(),
      lastName: yup.string().required(),
      password: yup.string().required().min(4).max(32),
    }),
  });

  // watch(email, (email, prevEmail) => {
  //     console.log("email", email);
  // })

  return {
    email,
    name,
    lastName,
    password,
    validate,
    errors,
    errorEmail,
    errorName,
    errorLastName,
    errorPassword,
    values,
  };
}
