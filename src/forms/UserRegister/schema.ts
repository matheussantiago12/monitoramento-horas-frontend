import * as Yup from 'yup'

const REQUIRED_MESSAGE = 'Este campo é obrigatório!'

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_MESSAGE),
  email: Yup.string().email('Informe um email válido!').required(REQUIRED_MESSAGE),
  sector: Yup.number().test('testeSector', REQUIRED_MESSAGE, function (value) {
    if (this.parent.type.id === 2) {
      return true
    }

    return !!value
  }).nullable(),
  team: Yup.number().test('testeTeam', REQUIRED_MESSAGE, function (value) {
    if (this.parent.type.id === 2) {
      return true
    }

    return !!value
  }).nullable(),
  role: Yup.string().test('testeRole', REQUIRED_MESSAGE, function (value) {
    if (this.parent.type.id === 2) {
      return true
    }

    return !!value
  }),
  type: Yup.object().shape({
    id: Yup.number().required(REQUIRED_MESSAGE)
  }).nullable().required(REQUIRED_MESSAGE)
})
