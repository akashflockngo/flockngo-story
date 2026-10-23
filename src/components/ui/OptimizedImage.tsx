import React, { useState, useEffect } from 'react'
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
  const [isLoaded, setIsLoaded] = useState<boolean>(isLoadedInStore)
  const [currentSrc, setCurrentSrc] = useState<string>(src)

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

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Subtle shimmer skeleton displayed only while first fetching */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-white/[0.04] animate-pulse backdrop-blur-sm z-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ${
          !isLoaded ? 'opacity-0' : ''
        } ${className}`}
        {...rest}
      />
    </div>
  )
}
