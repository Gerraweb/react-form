import React, { FC, ReactElement, Children, cloneElement, SetStateAction, Dispatch } from 'react'
import { __immutableSplice } from '@utils/array'
import { FieldError, ErrorDetails } from '../types'

type InputData = {
  name: string
  value: string
}

interface IFormValidator {
  updateErrors: Dispatch<SetStateAction<FieldError[]>>
  errors: FieldError[]
  children: ReactElement | ReactElement[]
}

const FormValidator: FC<IFormValidator> = ({ errors, children, updateErrors }) => {
  const onChange = (_onChange: (data: InputData) => void, data: InputData) => {
    const errorInErrors = errors.findIndex((__item) => __item.field == data.name)

    if (errorInErrors !== -1) {
      updateErrors(__immutableSplice(errors, errorInErrors, 1))
    }

    _onChange(data)
  }

  const renderInputs = () => {
    return Children.map(children, (item: ReactElement) => {
      let errorDetails: ErrorDetails[] = []

      const triggeredErrors = errors.find((__item) => {
        return __item.field === item.props.name
      })

      if (triggeredErrors && triggeredErrors.details) {
        errorDetails = triggeredErrors.details
      }

      return cloneElement(item, {
        errors: errorDetails,
        onChange: (inputData: InputData) => onChange(item.props.onChange, inputData),
      })
    })
  }

  return <>{renderInputs()}</>
}

export default FormValidator
