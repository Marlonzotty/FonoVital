import fs from 'node:fs'
import path from 'node:path'

const sampleRate = 44100
const durationSeconds = 1.1
const fadeSeconds = 0.05
const frequencies = [125, 250, 500, 1000, 2000, 3000, 4000, 8000]
const outputDir = path.resolve('public', 'audio', 'teste-auditivo')

const clamp16 = (value) => Math.max(-1, Math.min(1, value))

const createWavBuffer = (frequency) => {
  const sampleCount = Math.floor(sampleRate * durationSeconds)
  const dataSize = sampleCount * 2
  const buffer = Buffer.alloc(44 + dataSize)

  const writeString = (offset, value) => buffer.write(value, offset, 'ascii')
  const writeUint32 = (offset, value) => buffer.writeUInt32LE(value, offset)
  const writeUint16 = (offset, value) => buffer.writeUInt16LE(value, offset)

  writeString(0, 'RIFF')
  writeUint32(4, 36 + dataSize)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  writeUint32(16, 16)
  writeUint16(20, 1)
  writeUint16(22, 1)
  writeUint32(24, sampleRate)
  writeUint32(28, sampleRate * 2)
  writeUint16(32, 2)
  writeUint16(34, 16)
  writeString(36, 'data')
  writeUint32(40, dataSize)

  for (let i = 0; i < sampleCount; i += 1) {
    const time = i / sampleRate
    const fadeIn = Math.min(1, time / fadeSeconds)
    const fadeOut = Math.min(1, (durationSeconds - time) / fadeSeconds)
    const envelope = Math.min(fadeIn, fadeOut)
    const amplitude = 0.35 * envelope
    const sample = Math.sin(2 * Math.PI * frequency * time) * amplitude
    const pcm = Math.round(clamp16(sample) * 32767)
    buffer.writeInt16LE(pcm, 44 + i * 2)
  }

  return buffer
}

fs.mkdirSync(outputDir, { recursive: true })

for (const frequency of frequencies) {
  const filePath = path.join(outputDir, `${frequency}hz.wav`)
  fs.writeFileSync(filePath, createWavBuffer(frequency))
  console.log(`Wrote ${filePath}`)
}
