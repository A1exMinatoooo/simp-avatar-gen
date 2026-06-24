import { useRef } from 'react'

interface ImageUploaderProps {
  imageDataUrl: string | null
  onImageChange: (dataUrl: string | null) => void
}

export function ImageUploader({ imageDataUrl, onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 500
        canvas.height = 500
        const ctx = canvas.getContext('2d')!
        const scale = Math.max(500 / img.width, 500 / img.height)
        const sw = img.width * scale
        const sh = img.height * scale
        ctx.drawImage(img, (500 - sw) / 2, (500 - sh) / 2, sw, sh)
        onImageChange(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)

    e.target.value = ''
  }

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
      {imageDataUrl ? (
        <div className="flex items-center gap-3">
          <img
            src={imageDataUrl}
            alt="背景预览"
            className="w-16 h-16 object-cover rounded border border-gray-300"
          />
          <div className="flex gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              更换
            </button>
            <button
              onClick={() => onImageChange(null)}
              className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
            >
              移除
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          点击上传图片
        </button>
      )}
    </div>
  )
}
