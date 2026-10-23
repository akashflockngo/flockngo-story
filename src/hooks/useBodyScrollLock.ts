import { useEffect, useRef } from 'react'

/**
 * Bulletproof mobile & desktop background scroll lock
 * - Locks both html and body to prevent touch and trackpad bleed-through
 * - Compensates for scrollbar width to prevent layout shift
 * - Restores exact scroll position upon unlock without jumping to the top
 * - Safe against rapid toggles and unmounting
 */
export function useBodyScrollLock(isLocked: boolean): void {
  const scrollYRef = useRef<number>(0)
  const isLockedRef = useRef<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isLocked) {
      if (isLockedRef.current) return
      isLockedRef.current = true

      // Capture current scroll offset
      scrollYRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop

      // Calculate scrollbar width to prevent horizontal layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

      // Save previous inline styles for safe restoration
      const prevBodyOverflow = document.body.style.overflow
      const prevBodyPosition = document.body.style.position
      const prevBodyTop = document.body.style.top
      const prevBodyWidth = document.body.style.width
      const prevBodyPaddingRight = document.body.style.paddingRight
      const prevHtmlOverflow = document.documentElement.style.overflow

      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
      document.documentElement.style.overflow = 'hidden'

      return () => {
        isLockedRef.current = false
        const savedY = scrollYRef.current

        document.body.style.overflow = prevBodyOverflow
        document.body.style.position = prevBodyPosition
        document.body.style.top = prevBodyTop
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = prevBodyWidth
        document.body.style.paddingRight = prevBodyPaddingRight
        document.documentElement.style.overflow = prevHtmlOverflow

        // Seamlessly restore scroll position without jarring jump
        window.scrollTo({
          top: savedY,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        })
      }
    }
  }, [isLocked])
}
