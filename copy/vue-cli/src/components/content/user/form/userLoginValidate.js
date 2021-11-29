import { watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
  const { value: email, errorMessage: errorEmail } = useField("email");
  const { value: password, errorMessage: errorPassword } = useField("password");

  const { errors, validate, values } = useForm({
    validationSchema: yup.object({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required().min(4).max(32),
    }),
  });

  // watch(email, (email, prevEmail) => {
  //     console.log("email", email);
  // })

  return {
    email,
    password,
    validate,
    errors,
    errorEmail,
    errorPassword,
    values,
  };
}
