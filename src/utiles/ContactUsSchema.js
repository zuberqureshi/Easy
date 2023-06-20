import * as yup from 'yup';

export default ContactUsSchema = yup.object().shape({
    name:yup.string().min(3,'To Short').max(20,'To Long').required('name is must'),
    mobile:yup.string().required("Number is must").min(10,"Min digits 10").max(10,"Max digits 10"),
    
     email:yup.string().email('Invalid Email').required('Email is must'),


});