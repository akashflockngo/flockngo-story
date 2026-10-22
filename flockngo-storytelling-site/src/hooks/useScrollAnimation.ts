import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../config/gsap'

type AnimationCallback<T extends HTMLElement> = (
  ctx: gsap.Context,
  container: T,
  reducedMotion: boolean
) => void

type MatchMediaCallback<T extends HTMLElement> = (
  conditions: { isDesktop: boolean; isMobile: boolean; reduceMotion: boolean },
  context: gsap.Context,
  container: T
) => void

/**
 * Standard scoped GSAP animation hook with automatic cleanup on unmount
 * and prefers-reduced-motion awareness.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  callback: AnimationCallback<T>,
  deps: unknown[] = []
) {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context((self) => {
      callback(self, el, prefersReducedMotion)
    }, el)

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

/**
 * Responsive GSAP matchMedia hook with automatic cleanup
 * and distinct desktop vs. mobile scroll configurations.
 */
export function useResponsiveScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  callback: MatchMediaCallback<T>,
  deps: unknown[] = []
) {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    const mm = gsap.matchMedia(el)

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const conditions = context.conditions as {
          isDesktop: boolean
          isMobile: boolean
          reduceMotion: boolean
        }
        callback(conditions, context, el)
      }
    )

    return () => {
      mm.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

export { gsap, ScrollTrigger }
