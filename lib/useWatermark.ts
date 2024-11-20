import { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'

type WatermarkOption = {
  /**
   * Set the angle of the watermark.
   * @default -45
   * @example -90
   */
  angle: number
  /**
   * Set the opacity of the watermark.
   * @default 0.05
   * @example 0.1
   */
  opacity: number

  /**
   * Set the font hexa color of the watermark.
   * @example '#000000'
   * @default '#000000'
   */
  color: string

  /**
   * Set the size of the watermark.
   * @example 180
   * @default 180
   */
  size: number

  /**
   * Set the gap between the watermark.
   * @example 10
   * @default 0
   */
  gap: number
}

const defaultOption: WatermarkOption = {
  angle: -45,
  opacity: 0.05,
  size: 180,
  color: '#000000',
  gap: 0,
}

export default function useWatermark (text: string, option?: Partial<WatermarkOption>) {
  const {
    angle,
    opacity,
    color,
    gap,
    size,
  } = { ...defaultOption, ...option }
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const watermarkImage = useMemo(
    () => createWatermarkImage(text, {
      angle, opacity, color, size, gap,
    }),
    [text, angle, opacity, size],
  )

  const ref = useCallback((node: Element | null | undefined) => {
    if (!node) return
    const containerEl = node as HTMLElement
    setContainer(containerEl)
    containerEl.style.backgroundRepeat = 'repeat'
    containerEl.style.pointerEvents = 'none'
    containerEl.style.zIndex = '9999'
  }, [])

  useEffect(() => {
    if (!container) return

    container.style.backgroundImage = `url(${watermarkImage})`
    container.style.backgroundSize = `${size}px ${size}px`
  }, [container, watermarkImage, size])

  return { ref, watermarkImage }
}

const createWatermarkImage = (text: string, options: WatermarkOption) => {
  const {
    angle, opacity, color, size, gap,
  } = options

  // Consider the device's pixel ratio for resolution adjustment
  const devicePixelRatio = window.devicePixelRatio || 1
  const fontSize = size * (devicePixelRatio * 1.5) / text.length

  // Calculate the width and height
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  ctx.font = `${fontSize * devicePixelRatio}px sans-serif`
  const textMetrics = ctx.measureText(text)
  const textWidth = textMetrics.width

  // Use the font size as the text height
  const textHeight = fontSize * devicePixelRatio

  // Calculate the canvas size that can fully accommodate the text when rotated
  const canvasSize = Math.ceil(Math.sqrt(textWidth ** 2 + textHeight ** 2))
  canvas.width = canvasSize + gap
  canvas.height = canvasSize + gap

  // Scaling for high resolution
  ctx.scale(devicePixelRatio, devicePixelRatio)

  // Set the canvas background to transparent (default is transparent)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Move to the center of
  ctx.translate(
    canvas.width / (2 * devicePixelRatio),
    canvas.height / (2 * devicePixelRatio),
  )

  // Rotate text
  ctx.rotate((angle * Math.PI) / 180)

  // Set text style
  ctx.font = `${fontSize}px sans-serif`
  ctx.fillStyle = hexToRgba(color, opacity)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Draw text
  ctx.fillText(text, 0, 0)

  // Return data URL
  return canvas.toDataURL('image/png')
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
