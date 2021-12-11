import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'Este campo é obrigatório!'

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_MESSAGE),
  email: Yup.string().email('Informe um email válido!').required(REQUIRED_MESSAGE),
  sector: Yup.object().shape({
    id: Yup.number().required(REQUIRED_MESSAGE)
  }).nullable().required(REQUIRED_MESSAGE),
  team: Yup.object().shape({
    id: Yup.number().required(REQUIRED_MESSAGE)
  }).nullable().required(REQUIRED_MESSAGE),
  role: Yup.string().required(REQUIRED_MESSAGE),
  dailyWorkedHours: Yup.number()
    .required(REQUIRED_MESSAGE)
    .min(1, 'Insira um valor válido!')
    .nullable(),
  type: Yup.object().shape({
    id: Yup.number().required(REQUIRED_MESSAGE)
  }).nullable().required(REQUIRED_MESSAGE)
})
