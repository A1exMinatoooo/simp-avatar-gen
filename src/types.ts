export interface AvatarConfig {
  text: string
  bgColor: string
  textColor: string
  font: string
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
  font: 'sans-serif',
}

export const FONT_OPTIONS = [
  { label: '系统默认', value: 'sans-serif' },
  { label: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
  { label: '苹方', value: '"PingFang SC", sans-serif' },
  { label: '宋体', value: '"SimSun", serif' },
  { label: '黑体', value: '"SimHei", sans-serif' },
  { label: '楷体', value: '"KaiTi", serif' },
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
