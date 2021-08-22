import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
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

const MOBILE = 480
const TABLET = 1024

export const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient],
  )

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  const isMobile = useMemo(() => windowSize.width < MOBILE, [windowSize.width])
  const isDesktop = useMemo(() => windowSize.width >= TABLET, [windowSize.width])
  const isTablet = useMemo(() => !isMobile && !isDesktop, [isDesktop, isMobile])

  return { ...windowSize, isMobile, isDesktop, isTablet }
}

// eslint-disable-next-line max-len
// SOURCE: https://non-traditional.dev/checking-the-network-connection-with-a-react-hook-ec3d8e4de4ec

// Hooks use to guarantee the FREQ-05 requirement
export const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine)
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine)
  }
  useEffect(() => {
    window.addEventListener('offline', updateNetwork)
    window.addEventListener('online', updateNetwork)
    return () => {
      window.removeEventListener('offline', updateNetwork)
      window.removeEventListener('online', updateNetwork)
    }
  })
  return isOnline
}
