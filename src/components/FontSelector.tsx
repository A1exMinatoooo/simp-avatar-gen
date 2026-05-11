import { FONT_OPTIONS } from '../types'

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
}

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        字体选择
      </label>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
        {FONT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`text-left px-3 py-2 rounded text-sm transition-colors ${
              value === option.value
                ? 'bg-blue-100 border-blue-500 text-blue-700 border'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
            style={{ fontFamily: option.value }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
