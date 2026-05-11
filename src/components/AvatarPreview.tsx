import { useEffect, useRef, useCallback, useState } from 'react'
import { renderAvatar } from '../utils/canvas'
import { useDebounce } from '../hooks/useDebounce'

interface AvatarPreviewProps {
  text: string
  bgColor: string
  textColor: string
  font: string
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function AvatarPreview({ text, bgColor, textColor, font, canvasRef }: AvatarPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)
  const renderTimerRef = useRef<number | null>(null)

  const debouncedText = useDebounce(text, 300)
  const debouncedBgColor = useDebounce(bgColor, 150)
  const debouncedTextColor = useDebounce(textColor, 150)
  const debouncedFont = useDebounce(font, 150)

  const performRender = useCallback(() => {
    if (!canvasRef.current) return

    if (renderTimerRef.current) {
      cancelAnimationFrame(renderTimerRef.current)
    }

    renderTimerRef.current = requestAnimationFrame(() => {
      setIsRendering(true)
      renderAvatar(canvasRef.current!, debouncedText, debouncedBgColor, debouncedTextColor, debouncedFont)
      setIsRendering(false)
      renderTimerRef.current = null
    })
  }, [canvasRef, debouncedText, debouncedBgColor, debouncedTextColor, debouncedFont])

  useEffect(() => {
    performRender()

    return () => {
      if (renderTimerRef.current) {
        cancelAnimationFrame(renderTimerRef.current)
      }
    }
  }, [performRender])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="max-w-full h-auto border border-gray-300 shadow-lg"
        style={{ maxWidth: '500px', width: '100%' }}
      />
      {isRendering && (
        <span className="text-xs text-gray-500">渲染中...</span>
      )}
    </div>
  )
}
