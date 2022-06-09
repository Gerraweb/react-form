import React, { FormEvent } from 'react'
import cn from 'classnames'
import { Input } from '../types'
import ErrorMessage from '@components/form/errorMessage'

interface ITextInput extends Input<string> {
  onBlur?: () => void
  placeholder?: string
  htmlType?: string
}

const TextInput = ({
  title,
  value,
  name,
  errors = [],
  onChange,
  onBlur,
  placeholder = '',
  htmlType = 'text',
}: ITextInput) => {
  const _onChange = (e: FormEvent<HTMLInputElement>) => {
    onChange({ [e.currentTarget.name]: e.currentTarget.value })
  }

  const _onBlur = () => {
    onBlur ? onBlur() : null
  }

  return (
    <div className={cn(['input-wrapper', { 'input-wrapper-error': errors.length > 0 }])}>
      <ErrorMessage errors={errors} />
      {title ? <label> {title} </label> : null}
      <div className='input-inner-wrap'>
        <input
          onChange={_onChange}
          onBlur={_onBlur}
          value={value}
          placeholder={placeholder || ''}
          type={htmlType}
          name={name}
        />
      </div>
    </div>
  )
}

export default TextInput
