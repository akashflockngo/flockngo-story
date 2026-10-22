import React, { useRef, useState, useEffect, useCallback } from 'react'
import { BRAND_CONFIG } from '../config/brand'
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  className?: string
  autoPlay?: boolean
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  className = '',
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const timeDisplayRef = useRef<HTMLSpanElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isEnded, setIsEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [duration, setDuration] = useState(20)

  const formatTime = (secs: number) => {
    const s = Math.floor(secs % 60)
    return `0:${s < 10 ? '0' : ''}${s}`
  }

  // Update progress bar and time text without triggering full React component re-renders
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const cur = video.currentTime
    const dur = video.duration || duration

    if (progressBarRef.current && dur > 0) {
      const pct = (cur / dur) * 100
      progressBarRef.current.style.width = `${pct}%`
    }
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = `${formatTime(cur)} / ${formatTime(dur)}`
    }
  }, [duration])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setIsLoading(false)
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration)
      }
    }

    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
      setIsEnded(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setIsEnded(true)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = '100%'
      }
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('error', handleError)

    // Attempt muted inline autoplay if permitted
    if (autoPlay) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked by user gesture policy; remains ready
          setIsPlaying(false)
          setIsLoading(false)
        })
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('error', handleError)
    }
  }, [autoPlay, handleTimeUpdate])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isEnded) {
      video.currentTime = 0
      setIsEnded(false)
      video.play().catch(() => setIsPlaying(false))
      return
    }

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(() => setIsPlaying(false))
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleReplay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    setIsEnded(false)
    video.play().catch(() => setIsPlaying(false))
  }

  return (
    <div
      className={`relative w-full aspect-video max-h-[85vh] rounded-[24px] sm:rounded-[36px] bg-[#0A0D14] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center group ${className}`}
    >
      {/* Optimized ambient background reflection using lightweight poster instead of duplicate video decoding */}
      <div
        className="absolute inset-0 bg-[#0A0D14] z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={BRAND_CONFIG.assets.videoPoster}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover blur-3xl opacity-25 scale-125 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-[#0A0D14]/80" />
      </div>

      {/* Center Phone Chassis Container preserving full 9:16 video without stretching or cropping */}
      <div className="relative z-10 h-full max-h-[96%] aspect-[9/16] py-2 sm:py-4 px-2 flex items-center justify-center">
        <div className="relative w-full h-full rounded-[22px] sm:rounded-[32px] overflow-hidden bg-black border border-white/20 shadow-2xl">
          
          {/* Subtle phone status bar simulation */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3 bg-black/80 rounded-full z-20 pointer-events-none" />

          {/* Primary Video Element */}
          {!hasError ? (
            <video
              ref={videoRef}
              src={BRAND_CONFIG.assets.video}
              poster={BRAND_CONFIG.assets.videoPoster}
              preload="metadata"
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
              aria-label="FlocknGo 20-second cinematic story video"
            />
          ) : (
            /* Accessible fallback if video file is missing or unsupported */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-300">
              <img
                src={BRAND_CONFIG.assets.videoPoster}
                alt="FlocknGo Brand Poster"
                className="w-3/4 max-w-[200px] rounded-xl shadow-lg mb-3 object-cover"
              />
              <p className="text-xs font-bold text-slate-200">Video Preview Poster</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
                The cinematic film can also be viewed on the official FlocknGo channels.
              </p>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30 pointer-events-none">
              <div
                className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#F47721] animate-spin"
                role="status"
                aria-label="Loading video"
              />
            </div>
          )}

          {/* Ended Replay Overlay */}
          {isEnded && !hasError && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-30 animate-fade-in">
              <button
                onClick={handleReplay}
                className="btn-cinematic-primary text-sm py-3 px-6 shadow-2xl focus:ring-2 focus:ring-[#F47721]"
                aria-label="Replay 20-second film"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Film</span>
              </button>
              <p className="text-xs text-slate-400 font-medium">FlocknGo • Experience Together</p>
            </div>
          )}
        </div>
      </div>

      {/* Theater Controls Overlay */}
      {!hasError && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col gap-2 transition-opacity duration-300">
          
          {/* Progress Bar Container */}
          <div
            className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Video playback progress"
          >
            <div
              ref={progressBarRef}
              className="h-full bg-[#F47721] rounded-full will-change-[width]"
              style={{ width: '0%' }}
            />
          </div>

          {/* Control Buttons & Timestamp */}
          <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]"
                aria-label={isPlaying ? 'Pause video' : isEnded ? 'Replay video' : 'Play video'}
              >
                {isEnded ? (
                  <RotateCcw className="w-4 h-4" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>

              <span
                ref={timeDisplayRef}
                className="font-mono text-slate-400 select-none text-[11px] sm:text-xs"
              >
                0:00 / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline select-none">
                {isMuted ? 'Muted' : 'Sound On'}
              </span>
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]"
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#F47721]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
