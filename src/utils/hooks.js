import { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

export const useToggle = (initialMode = false) => {
  const [boolean, setToggle] = useState(initialMode)
  const toggle = useCallback(() => {
    setToggle((prevState) => !prevState)
  }, [])
  return [boolean, toggle]
}

export const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useOnSuccessCall = (action, onSuccess) => {
  const isLoading = useSelector((state) => !!state.loading[action.ACTION])
  const error = useSelector((state) => !!state.error[action.ACTION])
  const errorMessage = useSelector((state) => state.error[action.ACTION])
  const wasLoading = usePrevious(isLoading)

  useEffect(() => {
    if (!isLoading && wasLoading && !error) {
      onSuccess()
    }
  })
  return [isLoading, errorMessage]
}
