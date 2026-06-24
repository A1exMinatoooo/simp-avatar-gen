import type { TextOverlay } from '../types'

interface OverlaySettingsProps {
  overlay: TextOverlay
  onChange: (overlay: TextOverlay) => void
}

export function OverlaySettings({ overlay, onChange }: OverlaySettingsProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        文字背景
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={overlay.bgColor}
          onChange={(e) => onChange({ ...overlay, bgColor: e.target.value })}
          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
        />
        <span className="text-sm text-gray-600">背景颜色</span>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">透明度</span>
          <span className="text-sm text-gray-500">{Math.round(overlay.bgOpacity * 100)}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(overlay.bgOpacity * 100)}
          onChange={(e) => onChange({ ...overlay, bgOpacity: Number(e.target.value) / 100 })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  )
}
