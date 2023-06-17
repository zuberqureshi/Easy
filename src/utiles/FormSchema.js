import * as yup from 'yup';


export const FormSchema = yup.object({
    firstname:yup.string().min(3,'To Short').max(20,'To Long').required('Fisrt name is must'),
    lastname:yup.string().min(3,'To Short').max(20,'To Long').required('Fisrt name is must'),
    email: yup.string().email('Invalid Email').required('Email is must'),
    age:yup.number().min(10).max(50).required('Age is must'),
    password:yup.string()
    .required('password is must')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),
    cpass:yup.string().required('Confirm Password is must')
    .oneOf([yup.ref('password'),null],'Both password must match'),
    


})