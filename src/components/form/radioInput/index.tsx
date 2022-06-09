import React, { memo } from 'react'
import cn from 'classnames'
import { Input } from '../types'
import './index.sass'

type Option = {
  title: string
  value: string
}

interface IOption {
  title: string
  value: string
  isActive: boolean
  onChange: (value: string) => void
}

interface IRadioInput extends Input<string> {
  options: Option[]
}

const Option = memo(({ title, isActive, onChange, value }: IOption) => {
  return (
    <div className='option'>
      <div
        onClick={() => onChange(value)}
        className={cn(['option__inner', { option__active: isActive }])}
      >
        <span> {title} </span>
      </div>
    </div>
  )
})

const RadioInput = ({ title, name, value, options, onChange }: IRadioInput) => {
  const _onChange = (value: string) => {
    onChange({ [name]: value })
  }

  const optionsList = options.map((item, index) => {
    return (
      <Option
        title={item.title}
        value={item.value}
        onChange={_onChange}
        key={index}
        isActive={item.value === value}
      />
    )
  })

  return (
    <div className='radio'>
      <span className='radio__title'> {title} </span>
      <div className='radio__options-list'>{optionsList}</div>
    </div>
  )
}

export default RadioInput
