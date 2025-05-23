import { useField, useForm} from 'vee-validate'
import * as yup from 'yup';

export default function () {
    const { value: schemaText, errorMessage: errorSchemaText} = useField('schemaText')

    
    const { errors, validate, values, setValues} = useForm({
        validationSchema: 
            yup.object({
            schemaText: yup.string().required(),
        })
    })

    return {
        setValues,
        schemaText,
        validate,
        errors,
        errorSchemaText,
        values
    }
}
    
