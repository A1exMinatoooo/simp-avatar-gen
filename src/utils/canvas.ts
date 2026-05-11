const CANVAS_SIZE = 500
const PADDING = 20
const MIN_FONT_SIZE = 20
const MAX_FONT_SIZE = 300

type TextAlign = 'left' | 'center' | 'right'

function measureTextWidth(ctx: CanvasRenderingContext2D, text: string, fontSize: number, font: string): number {
  ctx.font = `${fontSize}px ${font}`
  return ctx.measureText(text).width
}

function findOptimalFontSize(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  font: string,
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
      const width = measureTextWidth(ctx, line, mid, font)
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

export function renderAvatar(
  canvas: HTMLCanvasElement,
  text: string,
  bgColor: string,
  textColor: string,
  font: string,
  textAlign: TextAlign = 'center',
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  const lines = text.split('\n').filter((line) => line.trim() !== '')
  if (lines.length === 0) return

  const maxWidth = CANVAS_SIZE - PADDING * 2
  const maxHeight = CANVAS_SIZE - PADDING * 2

  const fontSize = findOptimalFontSize(ctx, lines, font, maxWidth, maxHeight)
  const lineHeight = fontSize * 1.2

  ctx.fillStyle = textColor
  ctx.font = `${fontSize}px ${font}`
  ctx.textAlign = textAlign
  ctx.textBaseline = 'middle'

  const totalHeight = lines.length * lineHeight
  const startY = (CANVAS_SIZE - totalHeight) / 2 + lineHeight / 2

  const xPosition = textAlign === 'left' ? PADDING : textAlign === 'right' ? CANVAS_SIZE - PADDING : CANVAS_SIZE / 2

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight
    ctx.fillText(line, xPosition, y, maxWidth)
  })
}

export function exportCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
