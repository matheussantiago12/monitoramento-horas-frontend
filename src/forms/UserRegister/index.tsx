import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { useFormik } from 'formik'
import { RegisterSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { classNames } from 'primereact/utils'
import { Container } from './styles'
import { IUser } from '../../services/user/IUser'
import { Toast } from 'primereact/toast'
import { ISector } from '../../services/sector/ISector'
import { ITeam } from '../../services/team/ITeam'
import { TeamService } from '../../services/team/TeamService'
import { SectorService } from '../../services/sector/SectorService'
import { UserService } from '../../services/user/UserService'
import { useHistory } from 'react-router-dom'

const typeOptions = [
  { id: 2, description: 'Líder' },
  { id: 3, description: 'Funcionário' }
]

interface IRegisterFormProps {
  data?: IUser
}

const UserRegisterForm = ({ data }: IRegisterFormProps) => {
  const [teamOptions, setTeamOptions] = useState<ITeam[]>()
  const [sectorOptions, setSectorOptions] = useState<ISector[]>()

  const toast = useRef<any>(null)
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    if (data) {
      await UserService.update({
        id: data.id,
        email: values.email,
        senha: values.password,
        cargo: values.role,
        equipeId: values.team,
        nomeCompleto: values.name,
        tipoPessoaId: values.type.id
      })
    } else {
      await UserService.create({
        email: values.email,
        senha: values.password,
        cargo: values.role,
        equipeId: values.team,
        nomeCompleto: values.name,
        tipoPessoaId: values.type.id
      })
    }

    history.push('/usuarios')
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: Math.random().toString(36).slice(2),
      sector: null,
      team: null,
      role: '',
      type: typeOptions[1]
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  const handleCopyPassword = async () => {
    navigator.clipboard.writeText(formik.values.password)

    toast.current!.show({
      severity: 'info',
      detail: 'Copiado para a área de transferência',
      life: 2500
    })
  }

  const fetchTeamsBySectorId = async (id: number | null) => {
    const teams = await TeamService.getBySectorId(Number(id))
    setTeamOptions(teams)
  }

  const handleChangeSector = async (e: DropdownChangeParams) => {
    formik.handleChange(e)

    fetchTeamsBySectorId(e.target.value)
  }

  useEffect(() => {
    const fetchSectors = async () => {
      const sectors = await SectorService.getAll()
      setSectorOptions(sectors)
    }

    fetchSectors()
  }, [])

  useEffect(() => {
    if (data) {
      fetchTeamsBySectorId(data.pessoa!.equipe!.setorId).then(() => {
        formik.setFieldValue('name', data.pessoa?.nomeCompleto)
        formik.setFieldValue('email', data.email)
        formik.setFieldValue('sector', data.pessoa?.equipe?.setorId)
        formik.setFieldValue('team', data.pessoa?.equipeId)
        formik.setFieldValue('role', data.pessoa?.cargo)
        formik.setFieldValue('dailyWorkedHours', data.pessoa?.horasTrabalhoDiario)
      })
    }
  }, [data])

  return (
    <Container>
      <Toast ref={toast} />
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
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
          {!data && (
            <div className="col-12 field">
              <div className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('password') }, 'inputfield w-full')}
                    disabled={true}
                  />
                  <label htmlFor="password">Senha</label>
                </span>
                <Button type="button" icon="pi pi-copy" onClick={handleCopyPassword} />
              </div>
              <small className="p-error">{getFormErrorMessage('email')}</small>
            </div>
          )}
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
          <div className="col-12 md:col-6 field">
            <span className="p-float-label">
              <Dropdown
                id="sector"
                value={formik.values.sector}
                options={sectorOptions}
                optionValue="id"
                optionLabel="descricao"
                onChange={handleChangeSector}
                className={classNames({ 'p-invalid': isFormFieldValid('sector') }, 'inputfield w-full')}
              />
              <label htmlFor="sector">Setor</label>
            </span>
            <small className="p-error">{getFormErrorMessage('sector')}</small>
          </div>
          <div className="col-12 md:col-6 field">
            <span className="p-float-label">
              <Dropdown
                id="team"
                value={formik.values.team}
                options={teamOptions}
                optionValue="id"
                optionLabel="nome"
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('team') }, 'inputfield w-full')}
                disabled={!formik.values.sector}
              />
              <label htmlFor="team">Equipe</label>
            </span>
            <small className="p-error">{getFormErrorMessage('team')}</small>
          </div>
          <div className="col-12 field">
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
          <div className="col-12 mt-2 flex justify-content-end">
            <Button icon="pi pi-check" label="Salvar" type="submit" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export { UserRegisterForm }
