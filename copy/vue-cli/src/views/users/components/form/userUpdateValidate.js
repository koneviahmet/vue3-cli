import { watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
  const { value: email, errorMessage: errorEmail } = useField("email");
  const { value: name, errorMessage: errorName } = useField("name");
  const { value: userName, errorMessage: errorUserName } = useField("userName");
  const { value: currentPassword, errorMessage: errorCurrentPassword } = useField("currentPassword");
  const { value: password, errorMessage: errorPassword } = useField("password");
  const { value: confirmPassword, errorMessage: errorConfirmPassword } = useField("confirmPassword");

  const { errors, validate, values, setValues } = useForm({
    validationSchema: yup.object({
      email: yup
        .string()
        .required()
        .email(),
      name: yup.string().required(),
      userName: yup.string().required(),
      currentPassword: yup.string()
        .test('current-password-required', 'Current password is required when changing password', function(value) {
          // Require current password only if user is changing password
          return this.parent.password ? !!value : true;
        }),
      password: yup.string().test('password-length', 'Password must be between 4 and 32 characters', function(value) {
          // Skip validation if password is empty
          if (!value) return true;
          // Apply min/max length validation only when password is provided
          return value.length >= 4 && value.length <= 32;
        }).notRequired(),
      confirmPassword: yup.string()
        .test('passwords-match', 'Passwords must match', function(value) {
          return !this.parent.password || value === this.parent.password;
        }),
    }),
  });

  return {
    setValues,
    email,
    name,
    userName,
    currentPassword,
    password,
    confirmPassword,
    validate,
    errors,
    errorEmail,
    errorName,
    errorUserName,
    errorCurrentPassword,
    errorPassword,
    errorConfirmPassword,
    values,
  };
}
