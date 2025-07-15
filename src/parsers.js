import yaml from 'js-yaml'
import path from 'path'
import { getFileData } from './getFileData.js'

export default function parseFile(filepath) {
  const extension = path.extname(filepath)
  const data = getFileData(filepath)

  if (extension === '.yaml' || extension === '.yml') return yaml.load(data)
  if (extension === '.json') return JSON.parse(data)
}
