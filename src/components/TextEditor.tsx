import { FontSelector } from './FontSelector'
import { FONT_WEIGHTS } from '../types'
import { useCallback } from 'react'

interface TextEditorProps {
  text: string
  font: string
  fontWeight: number
  fontSize: number
  onTextChange: (text: string) => void
  onFontChange: (font: string) => void
  onFontWeightChange: (weight: number) => void
  onFontSizeChange: (size: number) => void
}

export function TextEditor({ text, font, fontWeight, fontSize, onTextChange, onFontChange, onFontWeightChange, onFontSizeChange }: TextEditorProps) {
  const isAuto = fontSize === 0

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFontSizeChange(Number(e.target.value))
  }, [onFontSizeChange])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          文字内容
        </label>
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="输入文字，换行可创建多行&#10;例如：&#10;12月25日&#10;休息"
        />
        <p className="mt-1 text-xs text-gray-500">使用换行符创建多行文字</p>
      </div>

      <FontSelector value={font} onChange={onFontChange} />

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            字重
          </label>
          <span className="text-sm text-gray-500">{fontWeight}</span>
        </div>
        <input
          type="range"
          min={100}
          max={900}
          step={100}
          value={fontWeight}
          onChange={(e) => onFontWeightChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between mt-1">
          {FONT_WEIGHTS.filter((_, i) => i % 2 === 0).map((w) => (
            <span key={w.value} className="text-xs text-gray-400">{w.label}</span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            字号
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{isAuto ? '自动' : `${fontSize}px`}</span>
            <button
              onClick={() => onFontSizeChange(isAuto ? 100 : 0)}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${isAuto ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {isAuto ? '手动' : '自动'}
            </button>
          </div>
        </div>
        <input
          type="range"
          min={20}
          max={300}
          step={1}
          value={isAuto ? 100 : fontSize}
          onChange={handleSliderChange}
          disabled={isAuto}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 ${isAuto ? 'opacity-40' : ''}`}
        />
      </div>
    </div>
  )
}
