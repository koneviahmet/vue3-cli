import { useField, useForm} from 'vee-validate'
import * as yup from 'yup';

export default function () {
    const { value: searchText, errorMessage: errorSearchText } = useField('searchText')

    
    const { errors, validate, values, setValues} = useForm({
        validationContacts: 
        yup.object({
          searchText: yup.string()
        })
    })


    return {
        setValues,
        searchText,
        validate,
        errors,
        errorSearchText,
        values         
    }
}
    
