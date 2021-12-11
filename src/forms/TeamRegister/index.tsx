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

interface IRegisterFormProps {
  data?: ITeam
}

const TeamRegisterForm = ({ data }: IRegisterFormProps) => {
  const [sectorOptions, setSectorOptions] = useState<ISector[]>()

  const handleSubmit = async (values: any) => {
    console.log('login', values)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      sector: null
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

    fetchSectors()
  }, [])

  useEffect(() => {
    if (data) {
      formik.setFieldValue('name', data.nome)
      formik.setFieldValue('sector', data.setor)
    }
  }, [data])

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
          <div className="col-12 mt-2 flex justify-content-end">
            <Button icon="pi pi-check" label="Salvar" type="submit" />
          </div>
        </div>
      </form>
    </Container>
  )
}

export { TeamRegisterForm }
