import { useField, useForm} from 'vee-validate'
import * as yup from 'yup';

export default function () {
    const { value: contact_name, errorMessage: errorContact_name} = useField('contact_name')
    const { value: contact_email, errorMessage: errorContact_email} = useField('contact_email')
    const { value: contact_subject, errorMessage: errorContact_subject} = useField('contact_subject')
    const { value: contact_message, errorMessage: errorContact_message} = useField('contact_message')
    const { value: contact_status, errorMessage: errorContact_status} = useField('contact_status')
    const { value: created, errorMessage: errorcreated} = useField('created')
    const { value: updated, errorMessage: errorupdated} = useField('updated')
    

    
    const { errors, validate, values, setValues} = useForm({
        validationSchema: 
            yup.object({
            contact_name: yup.string().required(),
            contact_email: yup.string().required(),
            contact_subject: yup.string().required(),
            contact_message: yup.string().required(),
            contact_status: yup.string().required(),
            created: yup.string().required(),
            updated: yup.string().required(),
            
        })
    })

    return {
        setValues,
        contact_name,
        contact_email,
        contact_subject,
        contact_message,
        contact_status,
        created,
        updated,
        
        validate,
        errors,
        errorContact_name,
        errorContact_email,
        errorContact_subject,
        errorContact_message,
        errorContact_status,
        errorcreated,
        errorupdated,
        
        values         
    }
}
    
