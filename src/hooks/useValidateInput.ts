/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from 'formik'

export const useValidateInput = (formik: FormikProps<any>) => {
  const isFormFieldValid = (name: string) => {
    return !!(formik.touched[name] && formik.errors[name])
  }

  const getFormErrorMessage = (name: string) => {
    return isFormFieldValid(name) && formik.errors[name]
  }

  return {
    isFormFieldValid,
    getFormErrorMessage
  }
}
