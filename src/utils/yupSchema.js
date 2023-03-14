import * as yup from 'yup'

export default yup.object().shape({
  full_name: yup
    .string()
    .required('Campo obligatorio')
    .min(2, 'Tu nombre debe contener más de 2 caracteres')
    .max(100, 'Tu nombre debe contener menos de 100 caracteres'),
  email: yup
    .string()
    .required('Campo obligatorio')
    .email('El email debe ser válido'),
  birth_date: yup
    .date()
    .required('Campo obligatorio')
    .typeError('Debe introducir una fecha válida'),
  country_of_origin: yup.string().required('Campo obligatorio'),
  terms_and_conditions: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones')
    .required('Debe aceptar los términos y condiciones'),
})
