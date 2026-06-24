import { useRef, useState, useCallback, useEffect } from 'react'
import type { ImageCrop } from '../types'

const PREVIEW_SIZE = 500

interface ImageCropperProps {
  imageDataUrl: string | null
  imageCrop: ImageCrop
  onImageChange: (dataUrl: string | null) => void
  onCropChange: (crop: ImageCrop) => void
}

export function ImageCropper({ imageDataUrl, imageCrop, onImageChange, onCropChange }: ImageCropperProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onImageChange(reader.result as string)
      onCropChange({ scale: 1, offsetX: 0.5, offsetY: 0.5 })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  useEffect(() => {
    if (imageDataUrl) {
      const img = new Image()
      img.onload = () => setImage(img)
      img.src = imageDataUrl
    } else {
      setImage(null)
    }
  }, [imageDataUrl])

  const maxScale = image ? Math.max(image.width, image.height) / Math.min(image.width, image.height) : 3

  const getClampedCrop = useCallback((crop: ImageCrop): ImageCrop => {
    const scale = Math.max(1, Math.min(maxScale, crop.scale))
    const minDim = image ? Math.min(image.width, image.height) : 1
    const srcSize = minDim / scale
    const halfView = (srcSize / 2) / (image ? Math.max(image.width, image.height) : 1)
    const offsetX = Math.max(halfView, Math.min(1 - halfView, crop.offsetX))
    const offsetY = Math.max(halfView, Math.min(1 - halfView, crop.offsetY))
    return { scale, offsetX, offsetY }
  }, [maxScale, image])

  const drawCropPreview = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = PREVIEW_SIZE
    canvas.height = PREVIEW_SIZE

    const crop = getClampedCrop(imageCrop)
    const minDim = Math.min(image.width, image.height)
    const srcSize = minDim / crop.scale

    const srcX = crop.offsetX * image.width - srcSize / 2
    const srcY = crop.offsetY * image.height - srcSize / 2

    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE)
    ctx.drawImage(image, srcX, srcY, srcSize, srcSize, 0, 0, PREVIEW_SIZE, PREVIEW_SIZE)
  }, [image, imageCrop, getClampedCrop])

  useEffect(() => {
    drawCropPreview()
  }, [drawCropPreview])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current || !image) return

    const rect = containerRef.current.getBoundingClientRect()
    const scale = imageCrop.scale
    const minDim = Math.min(image.width, image.height)
    const srcSize = minDim / scale

    const dx = (e.clientX - lastPos.current.x) / rect.width * (srcSize / image.width)
    const dy = (e.clientY - lastPos.current.y) / rect.height * (srcSize / image.height)
    lastPos.current = { x: e.clientX, y: e.clientY }

    onCropChange(getClampedCrop({
      scale: imageCrop.scale,
      offsetX: imageCrop.offsetX - dx,
      offsetY: imageCrop.offsetY - dy,
    }))
  }, [image, imageCrop, getClampedCrop, onCropChange])

  const handlePointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  const handleZoomChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = Number(e.target.value)
    onCropChange(getClampedCrop({ ...imageCrop, scale }))
  }, [imageCrop, getClampedCrop, onCropChange])

  if (!imageDataUrl) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          背景图片
        </label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          点击上传图片
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        裁剪图片
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-300 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
        />
        <div className="absolute inset-0 border-2 border-white/50 rounded-md pointer-events-none" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">缩放</span>
          <span className="text-sm text-gray-500">{imageCrop.scale.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min={1}
          max={maxScale}
          step={0.05}
          value={imageCrop.scale}
          onChange={handleZoomChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          更换图片
        </button>
        <button
          onClick={() => { onImageChange(null); onCropChange({ scale: 1, offsetX: 0.5, offsetY: 0.5 }) }}
          className="flex-1 px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
        >
          移除
        </button>
      </div>
    </div>
  )
}
