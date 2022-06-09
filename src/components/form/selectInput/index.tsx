import React, {
  useEffect,
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MutableRefObject,
  memo,
} from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import ClickOutside from '@components/clickOutside'
import cn from 'classnames'
import { Input } from '../types'
import './index.scoped.sass'

type Option = {
  title: string
  value: string
}

interface IOption {
  title: string
  value: string
  isFocused: boolean
  onChange: (value: string) => void
  onHover: () => void
}

interface ISelectInput extends Input<string> {
  options: Option[]
  onBlur?: () => void
}

const Option = memo(({ title, value, isFocused, onChange, onHover }: IOption) => {
  return (
    <div
      onMouseEnter={() => onHover()}
      onClick={() => onChange(value)}
      className={`select-wrap ${isFocused ? 'select-wrap-focused' : ''}`}
    >
      <span>{title}</span>
    </div>
  )
})

const disableDefaultBehavior = (e: ReactKeyboardEvent | MouseEvent) => {
  e.preventDefault()
}

const SelectInput = ({ title, name, value, onBlur, options, onChange }: ISelectInput) => {
  const inputWrap = useRef<HTMLDivElement>(null)

  const [isOptionsVisible, toggleOptionsVisibilite] = useState<boolean>(false)
  const [focusedOptionIndex, setFocusedIndex] = useState<number>(0)

  const handleKeys = (e: KeyboardEvent): void => {
    if (e.keyCode === 40) {
      setFocusedIndex((currentIndex) => {
        if (options.length > currentIndex) {
          return (currentIndex += 1)
        } else {
          return 0
        }
      })
    }

    if (e.keyCode === 38) {
      setFocusedIndex((currentIndex) => {
        if (currentIndex === 0) {
          return options.length
        } else {
          return (currentIndex -= 1)
        }
      })
    }

    if (e.keyCode === 13) {
      const selectItem = options[focusedOptionIndex]

      _onChange(selectItem.value)
    }
  }

  useEffect(() => {
    if (isOptionsVisible) {
      document.addEventListener('keydown', handleKeys, true)
    } else {
      document.removeEventListener('keydown', handleKeys, true)
    }

    return () => {
      document.removeEventListener('keydown', handleKeys, true)
    }
  }, [isOptionsVisible])

  const _onChange = (value: ISelectInput['value']) => {
    toggleOptionsVisibilite(false)

    onBlur ? onBlur() : null

    onChange({
      [name]: value,
    })
  }

  const optionsList = options.map((item, index) => {
    return (
      <Option
        onHover={() => setFocusedIndex(index)}
        key={index}
        title={item.title}
        value={item.value}
        isFocused={index === focusedOptionIndex}
        onChange={_onChange}
      />
    )
  })

  const currentValue = options.find((item) => item.value == value)

  return (
    <div className='input-wrapper  input-wrapper-select'>
      <label>{title}</label>
      <div className='select-input-wrap input-inner-wrap' ref={inputWrap}>
        <input
          onKeyPress={(e) => disableDefaultBehavior(e)}
          onKeyDown={(e) => disableDefaultBehavior(e)}
          onContextMenu={(e) => disableDefaultBehavior(e)}
          onMouseDown={(e) => disableDefaultBehavior(e)}
          onClick={() => toggleOptionsVisibilite(!isOptionsVisible)}
          onChange={() => {
            return false
          }}
          value={currentValue ? currentValue.title : ''}
          type='text'
        />
        <div className='icon-down' onClick={() => toggleOptionsVisibilite(!isOptionsVisible)}>
          <i className='fa fa-caret-down' aria-hidden='true'></i>
        </div>
      </div>
      <ClickOutside
        visible={true}
        onClose={() => toggleOptionsVisibilite(false)}
        exceptRef={inputWrap as MutableRefObject<HTMLElement>}
      >
        <div
          className={cn({ 'options-wrapper': true, 'options-wrapper--active': isOptionsVisible })}
        >
          <Scrollbars style={{ height: 200 }}>{optionsList}</Scrollbars>
        </div>
      </ClickOutside>
    </div>
  )
}

export default SelectInput
