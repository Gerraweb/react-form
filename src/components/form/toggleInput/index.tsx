import React from 'react'
import cn from 'classnames'
import { Input } from '../types'
import './index.scoped.sass'

const ToggleInput = ({ name, value, title, onChange }: Input<boolean>) => {
  const _onChange = (value: boolean) => {
    onChange({ [name]: value })
  }

  return (
    <div className='toggler'>
      <span className='toggler__title'>{title}</span>
      <div className='toggler__wrap'>
        <span className={cn({ 'toggler__item-active': value })} onClick={() => _onChange(true)}>
          Да
        </span>
        <span className={cn({ 'toggler__item-active': !value })} onClick={() => _onChange(false)}>
          Нет
        </span>
      </div>
    </div>
  )
}

export default ToggleInput