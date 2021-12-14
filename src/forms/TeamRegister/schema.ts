import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'Este campo é obrigatório!'

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_MESSAGE),
  sector: Yup.number().required(REQUIRED_MESSAGE).nullable(),
  leader: Yup.number().required(REQUIRED_MESSAGE).nullable()
})
