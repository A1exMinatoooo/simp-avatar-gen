import { TextAlign, TEXT_ALIGN_OPTIONS } from '../types'

interface TextAlignSelectorProps {
  value: TextAlign
  onChange: (align: TextAlign) => void
}

export function TextAlignSelector({ value, onChange }: TextAlignSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        文本对齐
      </label>
      <div className="flex gap-2">
        {TEXT_ALIGN_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
              value === option.value
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            title={option.label}
          >
            <span className="flex items-center justify-center gap-1">
              {option.value === 'left' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
                </svg>
              )}
              {option.value === 'center' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M5 18h14" />
                </svg>
              )}
              {option.value === 'right' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" />
                </svg>
              )}
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
