import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default function () {
  const { value: searchText, errorMessage: errorSearchText } =
    useField("searchText");

  const { errors, validate, values } = useForm({
    validationSchema: yup.object({
      searchText: yup.string().required().min(4).max(32),
    }),
  });

  return {
    searchText,
    validate,
    errors,
    errorSearchText,
    values,
  };
}
