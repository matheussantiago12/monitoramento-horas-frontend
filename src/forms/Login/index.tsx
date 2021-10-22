import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { useFormik } from 'formik'
import { LoginSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { classNames } from 'primereact/utils'
import { Link, useHistory } from 'react-router-dom'
import { Container } from './styles'

export const LoginForm = () => {
  const [rememberPassword, setRememberPassword] = useState(true)

  const history = useHistory()

  const handleSubmit = async (values: any) => {
    history.push('/cadastro')
  }

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
          <h1 className="pb-5 col-10 p-text-bold text">
            Login
          </h1>
          <div className="col-12 field">
            <span className="p-float-label">
              <InputText
                id="login"
                value={formik.values.login}
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('login') }, 'inputfield w-full')}
              />
              <label htmlFor="login">Usuário</label>
            </span>
            <small className="p-error">{getFormErrorMessage('login')}</small>
          </div>
          <div className="col-12 field">
            <span className="p-float-label">
              <InputText
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('password') }, 'inputfield w-full')}
              />
              <label htmlFor="password">Senha</label>
            </span>
            <small className="p-error">{getFormErrorMessage('password')}</small>
          </div>
          <div className="field col-6 checkbox-container">
            <Checkbox inputId="checkbox" value={rememberPassword} onChange={() => setRememberPassword(!rememberPassword)} checked={rememberPassword} />
            <label htmlFor="checkbox" className="p-checkbox-label" style={{ marginLeft: '6px' }}>Lembrar senha</label>
          </div>
          <div className="field col-6 checkbox-container justify-content-end">
            <Link to="/teste">Esqueceu a senha?</Link>
          </div>
          <div className="field col-12">
            <Button label="Entrar" type="submit" className="w-full" />
          </div>
        </div>
      </form>
    </Container>
  )
}
