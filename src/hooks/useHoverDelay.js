import { useState } from 'react'

import { useEventListener } from 'usehooks-ts'

function useHoverDelay(elementRef) {
  const [value, setValue] = useState(false)

  const handleMouseEnter = () => {
    let intervalId
    const handleMouseMove = event => {
      if (elementRef?.current.contains(document.elementFromPoint(event.clientX, event.clientY))) {
        setValue(true)
        clearInterval(intervalId)
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
    intervalId = setInterval(() => {
      document.addEventListener('mousemove', handleMouseMove)
    }, 2000)

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }
  const handleMouseLeave = () => setValue(false)

  useEventListener('mouseenter', handleMouseEnter, elementRef)
  useEventListener('mouseleave', handleMouseLeave, elementRef)

  return value
}

export default useHoverDelay
