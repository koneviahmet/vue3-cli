import { watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
  const { value: email, errorMessage: errorEmail } = useField("email");
  const { value: name, errorMessage: errorName } = useField("name");
  const { value: username, errorMessage: errorusername } = useField("username");
  const { value: password, errorMessage: errorPassword } = useField("password");

  const { errors, validate, values, setValues} = useForm({
    validationSchema: yup.object({
      email: yup
        .string()
        .required(() => "check the email field.")
        .email(() => "Check the email field."),
      name: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required().min(4).max(32),
    }),
  });

  // watch(email, (email, prevEmail) => {
  //     console.log("email", email);
  // })

  return {
    setValues,
    email,
    name,
    username,
    password,
    validate,
    errors,
    errorEmail,
    errorName,
    errorusername,
    errorPassword,
    values,
  };
}
