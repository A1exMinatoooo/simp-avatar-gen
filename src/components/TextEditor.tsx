import { FONT_OPTIONS } from '../types'

interface TextEditorProps {
  text: string
  font: string
  onTextChange: (text: string) => void
  onFontChange: (font: string) => void
}

export function TextEditor({ text, font, onTextChange, onFontChange }: TextEditorProps) {
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          字体选择
        </label>
        <select
          value={font}
          onChange={(e) => onFontChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {FONT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
