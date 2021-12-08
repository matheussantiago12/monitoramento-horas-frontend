import * as Yup from 'yup'

export const ConfigurationsSchema = Yup.object().shape({
  minutes: Yup.number()
    .required('Este campo é obrigatório!')
    .min(1, 'O valor mínimo para este campo é 1.')
    .nullable()
})
