import { useEffect } from 'react'

export const useExitIntent = (handler) => {
  useEffect(() => {
    const onMouseLeave = (e) => {
      // Trigger when mouse moves above the top of the viewport
      if (e.clientY <= 0) {
        handler()
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [handler])
}

export default useExitIntent
