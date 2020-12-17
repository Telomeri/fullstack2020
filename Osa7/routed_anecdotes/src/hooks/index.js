import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event) => {
    setValue('')
  }
  const only_input = () => {
      return {
          type,
          value, 
          onChange
      }
  }

  return {
    type,
    value,
    onChange,
    reset,
    only_input
  }
}

