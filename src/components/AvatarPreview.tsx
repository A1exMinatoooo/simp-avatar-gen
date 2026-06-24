import { useEffect, useRef, useCallback, useState } from 'react'
import { renderAvatar } from '../utils/canvas'
import { useDebounce } from '../hooks/useDebounce'
import { DraggableText } from './DraggableText'
import type { TextAlign, BackgroundMode, TextPosition, TextOverlay, ImageCrop } from '../types'

interface AvatarPreviewProps {
  text: string
  bgColor: string
  textColor: string
  font: string
  fontWeight: number
  textAlign: TextAlign
  bgMode: BackgroundMode
  imageDataUrl: string | null
  imageCrop: ImageCrop
  textPosition: TextPosition
  textOverlay: TextOverlay
  onPositionChange: (pos: TextPosition) => void
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function AvatarPreview({
  text, bgColor, textColor, font, fontWeight, textAlign,
  bgMode, imageDataUrl, imageCrop, textPosition, textOverlay,
  onPositionChange, canvasRef,
}: AvatarPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)
  const renderTimerRef = useRef<number | null>(null)
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null)

  const debouncedText = useDebounce(text, 300)
  const debouncedBgColor = useDebounce(bgColor, 150)
  const debouncedTextColor = useDebounce(textColor, 150)
  const debouncedFont = useDebounce(font, 150)
  const debouncedFontWeight = useDebounce(fontWeight, 150)
  const debouncedTextAlign = useDebounce(textAlign, 150)
  const debouncedPosition = useDebounce(textPosition, 50)
  const debouncedOverlay = useDebounce(textOverlay, 150)
  const debouncedCrop = useDebounce(imageCrop, 100)

  useEffect(() => {
    if (bgMode === 'image' && imageDataUrl) {
      const img = new Image()
      img.onload = () => setLoadedImage(img)
      img.src = imageDataUrl
    } else {
      setLoadedImage(null)
    }
  }, [bgMode, imageDataUrl])

  useEffect(() => {
    document.fonts.load(`${debouncedFontWeight} 16px ${debouncedFont}`)
  }, [debouncedFont, debouncedFontWeight])

  const performRender = useCallback(() => {
    if (!canvasRef.current) return

    if (renderTimerRef.current) {
      cancelAnimationFrame(renderTimerRef.current)
    }

    renderTimerRef.current = requestAnimationFrame(async () => {
      setIsRendering(true)
      try {
        await document.fonts.load(`${debouncedFontWeight} 16px ${debouncedFont}`)
      } catch {
        // font load failed, proceed with fallback
      }
      renderAvatar(canvasRef.current!, debouncedText, debouncedBgColor, debouncedTextColor, debouncedFont, debouncedTextAlign, {
        bgMode,
        image: loadedImage,
        imageCrop: debouncedCrop,
        textPosition: debouncedPosition,
        textOverlay: debouncedOverlay,
        fontWeight: debouncedFontWeight,
      })
      setIsRendering(false)
      renderTimerRef.current = null
    })
  }, [canvasRef, debouncedText, debouncedBgColor, debouncedTextColor, debouncedFont, debouncedFontWeight, debouncedTextAlign, bgMode, loadedImage, debouncedCrop, debouncedPosition, debouncedOverlay])

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
      <div className="relative" style={{ maxWidth: '500px', width: '100%' }}>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full h-auto border border-gray-300 shadow-lg"
          style={{ maxWidth: '500px', width: '100%' }}
        />
        {bgMode === 'image' && loadedImage && (
          <DraggableText
            position={textPosition}
            onPositionChange={onPositionChange}
          />
        )}
      </div>
      {isRendering && (
        <span className="text-xs text-gray-500">渲染中...</span>
      )}
      {bgMode === 'image' && loadedImage && (
        <span className="text-xs text-gray-400">拖拽圆点调整文字位置</span>
      )}
    </div>
  )
}
