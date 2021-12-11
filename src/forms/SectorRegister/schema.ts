import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'Este campo é obrigatório!'

export const SectorSchema = Yup.object().shape({
  description: Yup.string().required(REQUIRED_MESSAGE)
})
