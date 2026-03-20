import { promises as fs } from 'node:fs'
import path from 'node:path'

const SRC_DIR = path.resolve(process.cwd(), 'src')
const ALLOWED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx'])

const findings = []

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await walk(fullPath)
      continue
    }

    if (!ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
      continue
    }

    const content = await fs.readFile(fullPath, 'utf8')
    const lines = content.split(/\r?\n/)

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]
      const lineNumber = index + 1
      const trimmed = line.trim()
      const prevTrimmed = index > 0 ? lines[index - 1].trim() : ''

      if (trimmed.includes('�')) {
        findings.push({
          file: fullPath,
          line: lineNumber,
          reason: 'Caractere inválido detectado (�).',
          excerpt: trimmed
        })
      }

      if (/^['"`]\?{2,}\s*[\p{L}\d]/u.test(trimmed) || />\s*\?{2,}\s*[\p{L}\d]/u.test(trimmed)) {
        findings.push({
          file: fullPath,
          line: lineNumber,
          reason: 'Texto suspeito com ?? em string/JSX.',
          excerpt: trimmed
        })
      }

      if (/^\?{2,}\s*[\p{L}\d]/u.test(trimmed) && prevTrimmed.endsWith('>')) {
        findings.push({
          file: fullPath,
          line: lineNumber,
          reason: 'Texto suspeito com ?? em linha JSX.',
          excerpt: trimmed
        })
      }
    }
  }
}

await walk(SRC_DIR)

if (findings.length > 0) {
  console.error('\nForam encontrados textos suspeitos (possível problema de encoding):\n')
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} -> ${finding.reason}`)
    console.error(`  ${finding.excerpt}`)
  }
  console.error('\nCorrija os textos acima antes de gerar build.\n')
  process.exit(1)
}

console.log('Check de textos: ok (nenhum ?? suspeito encontrado).')
