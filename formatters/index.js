import { stylish } from './stylishFormatter.js'
import { plain } from './plainFormatter.js'

export function chooseFormat(formatName) {
  const formatMap = {
    stylish,
    plain,
  }
  const formatter = formatMap[formatName] || stylish
  return formatter
}
