import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { useFormik } from 'formik'
import { RegisterSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { classNames } from 'primereact/utils'
import { Container } from './styles'

const teamOptions = [
  { id: 1, description: 'Frontend' },
  { id: 2, description: 'Backend' }
]

const sectorOptions = [
  { id: 1, description: 'Desenvolvimento' },
  { id: 2, description: 'Testes' },
  { id: 3, description: 'RH' }
]

const typeOptions = [
  { id: 1, description: 'Líder' },
  { id: 2, description: 'Funcionário' }
]

const RegisterForm = () => {
  const handleSubmit = async (values: any) => {
    console.log('login', values)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      sector: null,
      team: null,
      role: '',
      dailyWorkedHours: 0,
      type: typeOptions[1]
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  console.log(formik.errors)

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
          <h1 className="pb-5 col-10 p-text-bold text">
            Registro de usuário
          </h1>
          <div className="col-12 field">
            <span className="p-float-label">
              <InputText
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('name') }, 'inputfield w-full')}
              />
              <label htmlFor="login">Nome completo</label>
            </span>
            <small className="p-error">{getFormErrorMessage('name')}</small>
          </div>
          <div className="col-12 field">
            <span className="p-float-label">
              <InputText
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('email') }, 'inputfield w-full')}
              />
              <label htmlFor="login">E-mail</label>
            </span>
            <small className="p-error">{getFormErrorMessage('email')}</small>
          </div>
          <div className="col-12 field">
              <Dropdown
                placeholder="Tipo de usuário"
                id="type"
                value={formik.values.type}
                options={typeOptions}
                optionLabel="description"
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('type') }, 'inputfield w-full')}
              />
            <small className="p-error">{getFormErrorMessage('type')}</small>
          </div>
          {formik.values.type.id !== 1 && (
            <>
              <div className="col-6 field">
                <span className="p-float-label">
                  <Dropdown
                    id="sector"
                    value={formik.values.sector}
                    options={sectorOptions}
                    optionValue="id"
                    optionLabel="description"
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('sector') }, 'inputfield w-full')}
                  />
                  <label htmlFor="sector">Setor</label>
                </span>
                <small className="p-error">{getFormErrorMessage('sector')}</small>
              </div>
              <div className="col-6 field">
                <span className="p-float-label">
                  <Dropdown
                    id="team"
                    value={formik.values.team}
                    options={teamOptions}
                    optionValue="id"
                    optionLabel="description"
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('team') }, 'inputfield w-full')}
                  />
                  <label htmlFor="team">Equipe</label>
                </span>
                <small className="p-error">{getFormErrorMessage('team')}</small>
              </div>
              <div className="col-6 field">
                <span className="p-float-label">
                  <InputText
                    id="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('role') }, 'inputfield w-full')}
                  />
                  <label htmlFor="role">Cargo</label>
                </span>
                <small className="p-error">{getFormErrorMessage('role')}</small>
              </div>
              <div className="col-6 field">
                <span className="p-float-label">
                  <InputNumber
                    id="dailyWorkedHours"
                    value={formik.values.dailyWorkedHours}
                    onValueChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('dailyWorkedHours') }, 'inputfield w-full')}
                  />
                  <label htmlFor="password">Carga horária diária</label>
                </span>
                <small className="p-error">{getFormErrorMessage('dailyWorkedHours')}</small>
              </div>
            </>
          )}
          <div className="field col-12">
            <Button label="Entrar" type="submit" className="w-full" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export { RegisterForm }
