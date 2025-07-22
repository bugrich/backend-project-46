import { stylish } from './stylishFormatter.js'
import { plain } from './plainFormatter.js'
import { json } from './jsonFormatter.js'

export function getFormatter(formatName) {
  const formatMap = {
    stylish,
    plain,
    json,
  }
  const formatter = formatMap[formatName] || stylish
  return formatter
}
