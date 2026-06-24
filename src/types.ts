export type TextAlign = 'left' | 'center' | 'right'

export type BackgroundMode = 'color' | 'image'

export interface TextPosition {
  x: number
  y: number
}

export interface TextOverlay {
  bgColor: string
  bgOpacity: number
}

export interface ImageCrop {
  scale: number
  offsetX: number
  offsetY: number
}

export interface AvatarConfig {
  text: string
  bgColor: string
  textColor: string
  font: string
  fontWeight: number
  fontSize: number
  textAlign: TextAlign
  bgMode: BackgroundMode
  imageDataUrl: string | null
  imageCrop: ImageCrop
  textPosition: TextPosition
  textOverlay: TextOverlay
}

export interface ColorPreset {
  name: string
  bg: string
  text: string
}

export const DEFAULT_CONFIG: AvatarConfig = {
  text: '示例文字',
  bgColor: '#2563EB',
  textColor: '#FFFFFF',
  font: '"Noto Sans SC", sans-serif',
  fontWeight: 700,
  fontSize: 0,
  textAlign: 'center',
  bgMode: 'color',
  imageDataUrl: null,
  imageCrop: { scale: 1, offsetX: 0.5, offsetY: 0.5 },
  textPosition: { x: 0.5, y: 0.5 },
  textOverlay: { bgColor: '#000000', bgOpacity: 0.5 },
}

export const TEXT_ALIGN_OPTIONS: { label: string; value: TextAlign; icon: string }[] = [
  { label: '左对齐', value: 'left', icon: '☰' },
  { label: '居中', value: 'center', icon: '☰' },
  { label: '右对齐', value: 'right', icon: '☰' },
]

export const FONT_WEIGHTS = [
  { label: '细体', value: 100 },
  { label: '特细', value: 200 },
  { label: '纤细', value: 300 },
  { label: '常规', value: 400 },
  { label: '中粗', value: 500 },
  { label: '半粗', value: 600 },
  { label: '粗体', value: 700 },
  { label: '特粗', value: 800 },
  { label: '黑体', value: 900 },
]

export const FONT_OPTIONS = [
  { label: 'Noto Sans SC', value: '"Noto Sans SC", sans-serif' },
  { label: 'Noto Serif SC', value: '"Noto Serif SC", serif' },
  { label: 'WDXL Lubrifont SC', value: '"WDXL Lubrifont SC", sans-serif' },
  { label: 'ZCOOL KuaiLe', value: '"ZCOOL KuaiLe", sans-serif' },
  { label: 'ZCOOL QingKe', value: '"ZCOOL QingKe HuangYou", sans-serif' },
  { label: 'ZCOOL XiaoWei', value: '"ZCOOL XiaoWei", serif' },
  { label: 'Ma Shan Zheng', value: '"Ma Shan Zheng", serif' },
  { label: 'Long Cang', value: '"Long Cang", serif' },
  { label: 'Space Mono', value: '"Space Mono", monospace' },
]

export const COLOR_PRESETS: ColorPreset[] = [
  { name: '经典蓝白', bg: '#2563EB', text: '#FFFFFF' },
  { name: '温暖橙白', bg: '#F97316', text: '#FFFFFF' },
  { name: '清新绿白', bg: '#10B981', text: '#FFFFFF' },
  { name: '深邃紫白', bg: '#8B5CF6', text: '#FFFFFF' },
  { name: '暗夜白字', bg: '#1F2937', text: '#FFFFFF' },
  { name: '柔和粉黑', bg: '#FBCFE8', text: '#1F2937' },
  { name: '红色警示', bg: '#DC2626', text: '#FFFFFF' },
  { name: '金黄黑字', bg: '#FCD34D', text: '#1F2937' },
]
