import type { TextAlign, TextPosition, TextOverlay, BackgroundMode, ImageCrop } from '../types'

const CANVAS_SIZE = 500
const PADDING = 20
const MIN_FONT_SIZE = 20
const MAX_FONT_SIZE = 300
const OVERLAY_RADIUS = 12

function measureTextWidth(ctx: CanvasRenderingContext2D, text: string, fontSize: number, fontWeight: number, font: string): number {
  ctx.font = `${fontWeight} ${fontSize}px ${font}`
  return ctx.measureText(text).width
}

function findOptimalFontSize(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  font: string,
  fontWeight: number,
  maxWidth: number,
  maxHeight: number,
): number {
  let low = MIN_FONT_SIZE
  let high = MAX_FONT_SIZE
  let bestSize = MIN_FONT_SIZE

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const lineHeight = mid * 1.2
    const totalHeight = lines.length * lineHeight

    let maxLineWidth = 0
    for (const line of lines) {
      const width = measureTextWidth(ctx, line, mid, fontWeight, font)
      maxLineWidth = Math.max(maxLineWidth, width)
    }

    if (maxLineWidth <= maxWidth && totalHeight <= maxHeight) {
      bestSize = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return bestSize
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

export interface RenderOptions {
  bgMode?: BackgroundMode
  image?: HTMLImageElement | null
  imageCrop?: ImageCrop
  textPosition?: TextPosition
  textOverlay?: TextOverlay
  fontWeight?: number
  fontSize?: number
}

export function renderAvatar(
  canvas: HTMLCanvasElement,
  text: string,
  bgColor: string,
  textColor: string,
  font: string,
  textAlign: TextAlign = 'center',
  options?: RenderOptions,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE

  if (options?.bgMode === 'image' && options.image) {
    const img = options.image
    const crop = options.imageCrop ?? { scale: 1, offsetX: 0.5, offsetY: 0.5 }
    const imgAspect = img.width / img.height
    let srcW: number, srcH: number
    if (imgAspect > 1) {
      srcH = img.height
      srcW = img.height
    } else {
      srcW = img.width
      srcH = img.width
    }
    srcW /= crop.scale
    srcH /= crop.scale
    const srcX = (img.width - srcW) * crop.offsetX
    const srcY = (img.height - srcH) * crop.offsetY
    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, CANVAS_SIZE, CANVAS_SIZE)
  } else {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }

  const lines = text.split('\n').filter((line) => line.trim() !== '')
  if (lines.length === 0) return

  const fontWeight = options?.fontWeight ?? 700
  const maxWidth = CANVAS_SIZE - PADDING * 2
  const maxHeight = CANVAS_SIZE - PADDING * 2

  const fontSize = (options?.fontSize ?? 0) > 0
    ? options!.fontSize!
    : findOptimalFontSize(ctx, lines, font, fontWeight, maxWidth, maxHeight)
  const lineHeight = fontSize * 1.2
  const totalHeight = lines.length * lineHeight

  let maxLineWidth = 0
  for (const line of lines) {
    ctx.font = `${fontWeight} ${fontSize}px ${font}`
    maxLineWidth = Math.max(maxLineWidth, ctx.measureText(line).width)
  }

  const pos = options?.textPosition ?? { x: 0.5, y: 0.5 }
  const textX = pos.x * CANVAS_SIZE
  const textY = pos.y * CANVAS_SIZE

  if (options?.textOverlay && options.bgMode === 'image') {
    const { bgColor: overlayColor, bgOpacity } = options.textOverlay
    const pad = 12
    const rectW = maxLineWidth + pad * 2
    const rectH = totalHeight + pad * 2
    const rectX = textX - rectW / 2
    const rectY = textY - rectH / 2
    ctx.save()
    ctx.globalAlpha = bgOpacity
    ctx.fillStyle = overlayColor
    drawRoundedRect(ctx, rectX, rectY, rectW, rectH, OVERLAY_RADIUS)
    ctx.fill()
    ctx.restore()
  }

  ctx.fillStyle = textColor
  ctx.font = `${fontWeight} ${fontSize}px ${font}`
  ctx.textAlign = options?.bgMode === 'image' ? 'center' : textAlign
  ctx.textBaseline = 'middle'

  const startY = textY - totalHeight / 2 + lineHeight / 2

  if (options?.bgMode === 'image') {
    lines.forEach((line, index) => {
      const y = startY + index * lineHeight
      ctx.fillText(line, textX, y, maxWidth)
    })
  } else {
    const xPosition = textAlign === 'left' ? PADDING : textAlign === 'right' ? CANVAS_SIZE - PADDING : CANVAS_SIZE / 2
    lines.forEach((line, index) => {
      const y = startY + index * lineHeight
      ctx.fillText(line, xPosition, y, maxWidth)
    })
  }
}

export function exportCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
