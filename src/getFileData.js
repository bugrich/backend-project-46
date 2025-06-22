import fs from 'fs'
import path from 'node:path'

export const getFileData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}
