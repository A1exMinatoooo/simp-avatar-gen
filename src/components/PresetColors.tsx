import { COLOR_PRESETS } from '../types'

interface PresetColorsProps {
  onSelect: (bg: string, text: string) => void
}

export function PresetColors({ onSelect }: PresetColorsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        推荐配色
      </label>
      <div className="grid grid-cols-4 gap-2">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset.bg, preset.text)}
            className="group relative flex flex-col items-center p-2 rounded-md border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
            title={preset.name}
          >
            <div
              className="w-full h-8 rounded flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: preset.bg, color: preset.text }}
            >
              Aa
            </div>
            <span className="mt-1 text-xs text-gray-600 truncate w-full text-center">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
