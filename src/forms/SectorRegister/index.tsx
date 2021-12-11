import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useFormik } from 'formik'
import { SectorSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { classNames } from 'primereact/utils'
import { Container } from './styles'
import { ISector } from '../../services/sector/ISector'

interface IRegisterFormProps {
  data?: ISector
}

const SectorRegisterForm = ({ data }: IRegisterFormProps) => {
  const handleSubmit = async (values: any) => {
    console.log('login', values)
  }

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: SectorSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  useEffect(() => {
    if (data) {
      formik.setFieldValue('description', data.descricao)
    }
  }, [data])

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
          <div className="col-12 field">
            <span className="p-float-label">
              <InputText
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('description') }, 'inputfield w-full')}
              />
              <label htmlFor="description">Nome do setor</label>
            </span>
            <small className="p-error">{getFormErrorMessage('description')}</small>
          </div>
          <div className="col-12 mt-2 flex justify-content-end">
            <Button icon="pi pi-check" label="Salvar" type="submit" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export { SectorRegisterForm }
