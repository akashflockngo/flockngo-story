import React, { useState, useEffect, useRef } from 'react'
import { useAssetStore } from '../../store/useAssetStore'
import { preloadImage } from '../../services/queryClient'

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  priority?: boolean
  containerClassName?: string
  fallbackSrc?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  containerClassName = '',
  className = '',
  fallbackSrc,
  ...rest
}) => {
  const isLoadedInStore = useAssetStore((state) => state.loadedUrls.has(src))
  const markAssetLoaded = useAssetStore((state) => state.markAssetLoaded)
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return useAssetStore.getState().isAssetLoaded(src)
    }
    return false
  })
  const [currentSrc, setCurrentSrc] = useState<string>(src)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // Synchronize immediately if Zustand store gets marked loaded
  useEffect(() => {
    if (isLoadedInStore) {
      setIsLoaded(true)
    }
  }, [isLoadedInStore])

  // Check if browser already has the image cached and completed in DOM
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      markAssetLoaded(src)
      setIsLoaded(true)
    }
  }, [src, currentSrc, markAssetLoaded])

  useEffect(() => {
    if (priority) {
      preloadImage(src).then(() => {
        setIsLoaded(true)
      })
    }
  }, [src, priority])

  const handleLoad = () => {
    markAssetLoaded(src)
    setIsLoaded(true)
  }

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    }
  }

  const shouldBeVisible = isLoaded || priority

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Subtle shimmer skeleton displayed only while first fetching */}
      {!shouldBeVisible && (
        <div
          className="absolute inset-0 bg-neutral-200/50 dark:bg-white/[0.05] animate-pulse backdrop-blur-sm z-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          !shouldBeVisible ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...rest}
      />
    </div>
  )
}
