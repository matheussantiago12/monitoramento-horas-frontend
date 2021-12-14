import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { useFormik } from 'formik'
import { RegisterSchema } from './schema'
import { useValidateInput } from '../../hooks/useValidateInput'
import { classNames } from 'primereact/utils'
import { Container } from './styles'
import { ISector } from '../../services/sector/ISector'
import { SectorService } from '../../services/sector/SectorService'
import { ITeam } from '../../services/team/ITeam'
import { IUser } from '../../services/user/IUser'
import { UserService } from '../../services/user/UserService'
import { TeamService } from '../../services/team/TeamService'
import { useHistory } from 'react-router-dom'

interface IRegisterFormProps {
  data?: ITeam
}

const TeamRegisterForm = ({ data }: IRegisterFormProps) => {
  const [sectorOptions, setSectorOptions] = useState<ISector[]>()
  const [leaderOptions, setLeaderOptions] = useState<IUser[]>()

  const history = useHistory()

  const handleSubmit = async (values: any) => {
    if (data) {
      await TeamService.update({
        id: data.id,
        nome: values.name,
        pessoaLiderId: values.leader,
        setorId: values.sector
      })
    } else {
      await TeamService.create({
        nome: values.name,
        pessoaLiderId: values.leader,
        setorId: values.sector
      })
    }

    history.push('/equipes')
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      sector: null,
      leader: null
    },
    validationSchema: RegisterSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  useEffect(() => {
    const fetchSectors = async () => {
      const sectors = await SectorService.getAll()
      setSectorOptions(sectors)
    }

    const fetchLeaders = async () => {
      const leaders = await UserService.getLeaders()
      setLeaderOptions(leaders)
    }

    fetchSectors()
    fetchLeaders()
  }, [])

  useEffect(() => {
    if (data) {
      formik.setFieldValue('name', data.nome)
      formik.setFieldValue('sector', data.setor?.id)
      formik.setFieldValue('leader', data.pessoaLider?.id)
    }
  }, [data])

  console.log(formik.values)

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div className="formgrid grid">
          <div className="col-12 md:col-6 field">
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
          <div className="col-12 md:col-6 field">
            <span className="p-float-label">
              <Dropdown
                id="sector"
                value={formik.values.sector}
                options={sectorOptions}
                optionValue="id"
                optionLabel="descricao"
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('sector') }, 'inputfield w-full')}
              />
              <label htmlFor="sector">Setor</label>
            </span>
            <small className="p-error">{getFormErrorMessage('sector')}</small>
          </div>
          <div className="col-12 field">
            <span className="p-float-label">
              <Dropdown
                id="leader"
                value={formik.values.leader}
                options={leaderOptions}
                optionValue="id"
                optionLabel="pessoa.nomeCompleto"
                onChange={formik.handleChange}
                className={classNames({ 'p-invalid': isFormFieldValid('leader') }, 'inputfield w-full')}
              />
              <label htmlFor="leader">Líder</label>
            </span>
            <small className="p-error">{getFormErrorMessage('leader')}</small>
          </div>
          <div className="col-12 mt-2 flex justify-content-end">
            <Button icon="pi pi-check" label="Salvar" type="submit" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export { TeamRegisterForm }
