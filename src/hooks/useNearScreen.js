import { useEffect, useRef, useState } from 'react'

const useNearScreen = ({ distance = '300px' } = {}) => {
  const [isNearScreen, setIsNearScreen] = useState(false)
  const fromRef = useRef()

  useEffect(() => {

    const onChange = (entries, observer) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting) {
        setIsNearScreen(true)
        observer.disconnect()
      }
    }

    let _observer

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      _observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })

      _observer.observe(fromRef.current)
    })

    return () => _observer && _observer.disconnect()
  }, [])

  return { isNearScreen, fromRef }
}

export default useNearScreen
