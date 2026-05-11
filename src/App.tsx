import { useRef, useCallback, useMemo } from 'react'
import { AvatarPreview } from './components/AvatarPreview'
import { TextEditor } from './components/TextEditor'
import { ColorPicker } from './components/ColorPicker'
import { PresetColors } from './components/PresetColors'
import { ExportButton } from './components/ExportButton'
import { useLocalStorage } from './hooks/useLocalStorage'
import { exportCanvasAsPng } from './utils/canvas'
import { isContrastSufficient } from './utils/contrast'
import { DEFAULT_CONFIG, type AvatarConfig } from './types'

function App() {
  const [config, setConfig] = useLocalStorage<AvatarConfig>('avatar-gen-config', DEFAULT_CONFIG)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const contrastWarning = useMemo(
    () => !isContrastSufficient(config.bgColor, config.textColor),
    [config.bgColor, config.textColor],
  )

  const handleTextChange = useCallback(
    (text: string) => setConfig((prev) => ({ ...prev, text })),
    [setConfig],
  )

  const handleFontChange = useCallback(
    (font: string) => setConfig((prev) => ({ ...prev, font })),
    [setConfig],
  )

  const handleBgChange = useCallback(
    (bgColor: string) => setConfig((prev) => ({ ...prev, bgColor })),
    [setConfig],
  )

  const handleTextColorChange = useCallback(
    (textColor: string) => setConfig((prev) => ({ ...prev, textColor })),
    [setConfig],
  )

  const handlePresetSelect = useCallback(
    (bg: string, text: string) => setConfig((prev) => ({ ...prev, bgColor: bg, textColor: text })),
    [setConfig],
  )

  const handleExport = useCallback(() => {
    if (canvasRef.current) {
      exportCanvasAsPng(canvasRef.current, 'avatar.png')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          头像生成器
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 bg-gray-50 flex items-center justify-center">
              <AvatarPreview
                text={config.text}
                bgColor={config.bgColor}
                textColor={config.textColor}
                font={config.font}
                canvasRef={canvasRef}
              />
            </div>

            <div className="md:w-1/2 p-6 space-y-6">
              <TextEditor
                text={config.text}
                font={config.font}
                onTextChange={handleTextChange}
                onFontChange={handleFontChange}
              />

              <PresetColors onSelect={handlePresetSelect} />

              <ColorPicker
                bgColor={config.bgColor}
                textColor={config.textColor}
                onBgChange={handleBgChange}
                onTextChange={handleTextColorChange}
                contrastWarning={contrastWarning}
              />

              <ExportButton onExport={handleExport} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
