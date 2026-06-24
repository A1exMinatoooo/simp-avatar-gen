import { useRef, useCallback } from 'react'
import type { TextPosition } from '../types'

interface DraggableTextProps {
  position: TextPosition
  onPositionChange: (pos: TextPosition) => void
}

export function DraggableText({ position, onPositionChange }: DraggableTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getClampedPosition = useCallback((clientX: number, clientY: number): TextPosition => {
    const el = containerRef.current
    if (!el) return position
    const rect = el.getBoundingClientRect()
    const x = Math.max(0.1, Math.min(0.9, (clientX - rect.left) / rect.width))
    const y = Math.max(0.1, Math.min(0.9, (clientY - rect.top) / rect.height))
    return { x, y }
  }, [position])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    onPositionChange(getClampedPosition(e.clientX, e.clientY))
  }, [getClampedPosition, onPositionChange])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    onPositionChange(getClampedPosition(e.clientX, e.clientY))
  }, [getClampedPosition, onPositionChange])

  const handlePointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 cursor-move"
      style={{ touchAction: 'none' }}
    >
      <div
        className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow"
        style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%` }}
      />
    </div>
  )
}
