import { useRef, useCallback, useMemo } from 'react'
import { AvatarPreview } from './components/AvatarPreview'
import { TextEditor } from './components/TextEditor'
import { TextAlignSelector } from './components/TextAlignSelector'
import { ColorPicker } from './components/ColorPicker'
import { PresetColors } from './components/PresetColors'
import { ExportButton } from './components/ExportButton'
import { BackgroundModeToggle } from './components/BackgroundModeToggle'
import { ImageCropper } from './components/ImageCropper'
import { OverlaySettings } from './components/OverlaySettings'
import { useLocalStorage } from './hooks/useLocalStorage'
import { exportCanvasAsPng } from './utils/canvas'
import { isContrastSufficient } from './utils/contrast'
import { DEFAULT_CONFIG, FONT_OPTIONS, type AvatarConfig, type TextAlign, type BackgroundMode, type TextPosition, type TextOverlay, type ImageCrop } from './types'

function App() {
  const [config, setConfig] = useLocalStorage<AvatarConfig>('avatar-gen-config', DEFAULT_CONFIG)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const migratedConfig: AvatarConfig = useMemo(() => {
    const validFonts = FONT_OPTIONS.map((f) => f.value)
    let migrated: AvatarConfig = { ...config }
    if (!validFonts.includes(config.font)) {
      migrated = { ...migrated, font: DEFAULT_CONFIG.font }
    }
    if (!('fontWeight' in config)) {
      migrated = { ...migrated, fontWeight: DEFAULT_CONFIG.fontWeight }
    }
    if (!('fontSize' in config)) {
      migrated = { ...migrated, fontSize: DEFAULT_CONFIG.fontSize }
    }
    if (!('imageCrop' in config)) {
      migrated = { ...migrated, imageCrop: DEFAULT_CONFIG.imageCrop }
    }
    return migrated
  }, [config])

  const contrastWarning = useMemo(
    () => migratedConfig.bgMode === 'color' && !isContrastSufficient(migratedConfig.bgColor, migratedConfig.textColor),
    [migratedConfig.bgColor, migratedConfig.textColor, migratedConfig.bgMode],
  )

  const handleTextChange = useCallback(
    (text: string) => setConfig((prev) => ({ ...prev, text })),
    [setConfig],
  )

  const handleFontChange = useCallback(
    (font: string) => setConfig((prev) => ({ ...prev, font })),
    [setConfig],
  )

  const handleFontWeightChange = useCallback(
    (fontWeight: number) => setConfig((prev) => ({ ...prev, fontWeight })),
    [setConfig],
  )

  const handleFontSizeChange = useCallback(
    (fontSize: number) => setConfig((prev) => ({ ...prev, fontSize })),
    [setConfig],
  )

  const handleTextAlignChange = useCallback(
    (textAlign: TextAlign) => setConfig((prev) => ({ ...prev, textAlign })),
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

  const handleBgModeChange = useCallback(
    (bgMode: BackgroundMode) => setConfig((prev) => ({ ...prev, bgMode })),
    [setConfig],
  )

  const handleImageChange = useCallback(
    (imageDataUrl: string | null) => setConfig((prev) => ({ ...prev, imageDataUrl })),
    [setConfig],
  )

  const handleCropChange = useCallback(
    (imageCrop: ImageCrop) => setConfig((prev) => ({ ...prev, imageCrop })),
    [setConfig],
  )

  const handlePositionChange = useCallback(
    (textPosition: TextPosition) => setConfig((prev) => ({ ...prev, textPosition })),
    [setConfig],
  )

  const handleOverlayChange = useCallback(
    (textOverlay: TextOverlay) => setConfig((prev) => ({ ...prev, textOverlay })),
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
                text={migratedConfig.text}
                bgColor={migratedConfig.bgColor}
                textColor={migratedConfig.textColor}
                font={migratedConfig.font}
                fontWeight={migratedConfig.fontWeight}
                fontSize={migratedConfig.fontSize}
                textAlign={migratedConfig.textAlign}
                bgMode={migratedConfig.bgMode}
                imageDataUrl={migratedConfig.imageDataUrl}
                imageCrop={migratedConfig.imageCrop}
                textPosition={migratedConfig.textPosition}
                textOverlay={migratedConfig.textOverlay}
                onPositionChange={handlePositionChange}
                canvasRef={canvasRef}
              />
            </div>

            <div className="md:w-1/2 p-6 space-y-6">
              <TextEditor
                text={migratedConfig.text}
                font={migratedConfig.font}
                fontWeight={migratedConfig.fontWeight}
                fontSize={migratedConfig.fontSize}
                onTextChange={handleTextChange}
                onFontChange={handleFontChange}
                onFontWeightChange={handleFontWeightChange}
                onFontSizeChange={handleFontSizeChange}
              />

              <BackgroundModeToggle
                value={migratedConfig.bgMode}
                onChange={handleBgModeChange}
              />

              {migratedConfig.bgMode === 'image' && (
                <ImageCropper
                  imageDataUrl={migratedConfig.imageDataUrl}
                  imageCrop={migratedConfig.imageCrop}
                  onImageChange={handleImageChange}
                  onCropChange={handleCropChange}
                />
              )}

              <TextAlignSelector
                value={migratedConfig.textAlign}
                onChange={handleTextAlignChange}
              />

              {migratedConfig.bgMode === 'color' && (
                <>
                  <PresetColors onSelect={handlePresetSelect} />

                  <ColorPicker
                    bgColor={migratedConfig.bgColor}
                    textColor={migratedConfig.textColor}
                    onBgChange={handleBgChange}
                    onTextChange={handleTextColorChange}
                    contrastWarning={contrastWarning}
                  />
                </>
              )}

              {migratedConfig.bgMode === 'image' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      文字颜色
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={migratedConfig.textColor}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={migratedConfig.textColor}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <OverlaySettings
                    overlay={migratedConfig.textOverlay}
                    onChange={handleOverlayChange}
                  />
                </>
              )}

              <ExportButton onExport={handleExport} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
