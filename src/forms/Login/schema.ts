import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Informe o seu login!'),
  password: Yup.string().required('Informe a sua senha!')
})
