import React, { memo } from 'react'
import { ErrorDetails } from '../types'

interface IErrorMessage {
  errors: ErrorDetails[]
}

const ErrorMessage = memo(({ errors = [] }: IErrorMessage) => {
  const isErrors = errors.length > 0

  if (!isErrors) return null

  return (
    <div className='input-errors'>
      <div className='input-errors__wrap'>
        {errors.map((item, index) => {
          return (
            <div key={index} className='input-errors__item'>
              {item.message}
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default ErrorMessage
