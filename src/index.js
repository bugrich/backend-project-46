import _ from 'lodash'
import { parseFile } from './parsers.js'
import { isObject } from './isObject.js'
import { getFormatter } from './formatters/index.js'

export function genDiff(filepath1, filepath2, format) {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diffTree = buildDiff(data1, data2)
  const formatter = getFormatter(format)

  return formatter(diffTree)
}

export function buildDiff(data1, data2) {
  const keys = _.sortBy([
    ...new Set([...Object.keys(data1), ...Object.keys(data2)]),
  ])

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (isObject(value1) && isObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (!(key in data1)) {
      return { key, type: 'added', value: value2 }
    }

    if (!(key in data2)) {
      return { key, type: 'removed', value: value1 }
    }

    if (!_.isEqual(value1, value2)) {
      return { key, type: 'updated', oldValue: value1, newValue: value2 }
    }

    return { key, type: 'unchanged', value: value1 }
  })
}
