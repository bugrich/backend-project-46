import { getFileData } from './getFileData.js'
import _ from 'lodash'

export const genDiff = (filepath1, filepath2) => {
  const file1Data = JSON.parse(getFileData(filepath1))
  const file2Data = JSON.parse(getFileData(filepath2))

  const keys = _.sortBy([
    ...new Set([...Object.keys(file1Data), ...Object.keys(file2Data)]),
  ])

  const difference = keys
    .map((key) => {
      if (!(key in file2Data)) return `  - ${key}: ${file1Data[key]}`
      if (!(key in file1Data)) return `  + ${key}: ${file2Data[key]}`
      if (file1Data[key] !== file2Data[key])
        return `  - ${key}: ${file1Data[key]}\n  + ${key}: ${file2Data[key]}`
      return `    ${key}: ${file1Data[key]}`
    })
    .join('\n')

  return `{\n${difference}\n}`
}
