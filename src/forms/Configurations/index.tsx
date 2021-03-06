import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { InputNumber } from 'primereact/inputnumber'
import { useValidateInput } from '../../hooks/useValidateInput'
import { ConfigurationsSchema } from './schema'
import { classNames } from 'primereact/utils'
import { Button } from 'primereact/button'
import { ConfigurationService } from '../../services/configuration/ConfigurationService'

const ConfigurationsForm = () => {
  const handleSubmit = async (values: any) => {
    await ConfigurationService.update(values.minutes)
  }

  const formik = useFormik({
    initialValues: {
      minutes: 0
    },
    validationSchema: ConfigurationsSchema,
    onSubmit: handleSubmit
  })

  const { isFormFieldValid, getFormErrorMessage } = useValidateInput(formik)

  useEffect(() => {
    const fetchConfiguration = async () => {
      const configuration = await ConfigurationService.getConfiguration()
      formik.setFieldValue('minutes', configuration.tempoLimiteOciosidade)
    }

    fetchConfiguration()
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid formgrid">
        <div className="field col-12">
          <label>Tempo limite de ociosidade (minutos)*</label>
          <InputNumber
            name="minutes"
            value={formik.values.minutes}
            onValueChange={formik.handleChange}
            placeholder="Tempo limite de ociosidade (minutos)"
            className={classNames({ 'p-invalid': isFormFieldValid('minutes') }, 'inputfield w-full')}
          />
          <small className="p-error">{getFormErrorMessage('minutes')}</small>
        </div>
        <div className="col-12 flex justify-content-end">
          <Button icon="pi pi-check" type="submit" label="Salvar" />
        </div>
      </div>
    </form>
  )
}

export { ConfigurationsForm }
