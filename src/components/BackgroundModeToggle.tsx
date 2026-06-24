import type { BackgroundMode } from '../types'

interface BackgroundModeToggleProps {
  value: BackgroundMode
  onChange: (mode: BackgroundMode) => void
}

export function BackgroundModeToggle({ value, onChange }: BackgroundModeToggleProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        背景模式
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('color')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            value === 'color'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          纯色
        </button>
        <button
          onClick={() => onChange('image')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            value === 'image'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          图片
        </button>
      </div>
    </div>
  )
}
