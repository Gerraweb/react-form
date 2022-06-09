import React, { memo } from 'react'
import { copyArray } from '@utils/array'
import cn from 'classnames'
import './index.scoped.sass'
import { Input } from '../types'

interface IOption {
  title: string
  value: string
  isActive: boolean
  onChange: (value: IOption['value']) => void
}

const Option = memo(({ value, title, isActive, onChange }: IOption) => {
  return (
    <div className='option'>
      <span
        className={cn(['option__inner', { option__active: isActive }])}
        onClick={() => onChange(value)}
      >
        {title}
      </span>
    </div>
  )
})

type OptionValue = {
  title: string
  value: string
}

interface ICheckboxInput extends Input<string[]> {
  options: OptionValue[]
}

const CheckboxInput = ({ title, name, value, options, onChange }: ICheckboxInput) => {
  const _onChange = (_value: OptionValue['value']) => {
    const newValue: OptionValue['value'][] = copyArray(value)

    const index = newValue.findIndex((item) => item === _value)

    if (index === -1) {
      newValue.push(_value)
    } else {
      newValue.splice(index, 1)
    }

    onChange({
      [name]: newValue,
    })
  }

  const optionsList = options.map((option, index) => {
    return (
      <Option
        {...option}
        onChange={_onChange}
        key={index}
        isActive={value.some((activeValue) => activeValue === option.value)}
      />
    )
  })

  return (
    <div className='checkbox'>
      {title ? <label> {title} </label> : null}
      <div className='checkbox__options-list'>{optionsList}</div>
    </div>
  )
}

export default CheckboxInput
