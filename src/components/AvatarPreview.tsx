import { useEffect, useRef } from 'react'
import { renderAvatar } from '../utils/canvas'

interface AvatarPreviewProps {
  text: string
  bgColor: string
  textColor: string
  font: string
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function AvatarPreview({ text, bgColor, textColor, font, canvasRef }: AvatarPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      renderAvatar(canvasRef.current, text, bgColor, textColor, font)
    }
  }, [text, bgColor, textColor, font, canvasRef])

  return (
    <div ref={containerRef} className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="max-w-full h-auto border border-gray-300 shadow-lg"
        style={{ maxWidth: '500px', width: '100%' }}
      />
    </div>
  )
}
