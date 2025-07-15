import _ from 'lodash'
import parseFile from './parsers.js'

export const genDiff1 = (filepath1, filepath2) => {
  const file1Data = parseFile(filepath1)
  const file2Data = parseFile(filepath2)

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

export function genDiff(filepath1, filepath2) {
  const file1 = parseFile(filepath1)
  const file2 = parseFile(filepath2)

  return buildDiff(file1, file2)
}

export function buildDiff(data1, data2) {
  const keys = _.sortBy([
    ...new Set([...Object.keys(data1), ...Object.keys(data2)]),
  ])

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    const isObject = (val) =>
      val !== null && !Array.isArray(val) && typeof val === 'object'

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 }
    }

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 }
    }

    if (!_.isEqual(value1, value2)) {
      return { key, type: 'updated', oldValue: value1, newValue: value2 }
    }

    return { key, type: 'unchanged', value: value1 }
  })
}
