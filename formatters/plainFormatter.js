import { isObject } from '../src/isObject.js'

export function plain(diffTree, accumulator = '') {
  //console.dir(diffTree, { depth: null })
  const lineMaker = (parent, property, action) => {
    return `Property '${parent}${property}' was ${action}`
  }

  const result = diffTree
    .flatMap((node) => {
      const { key, type, value, children, oldValue, newValue } = node

      switch (type) {
        case 'added':
          return (
            lineMaker(accumulator, key, type) +
            ` with value: ${valueHandler(value)}`
          )

        case 'removed':
          return lineMaker(accumulator, key, type)

        case 'updated':
          return (
            lineMaker(accumulator, key, type) +
            `. From ${valueHandler(oldValue)} to ${valueHandler(newValue)}`
          )

        case 'unchanged':
          return []

        case 'nested':
          return plain(children, accumulator + `${key}.`)
      }
    })
    .join('\n')
  return result
}

function valueHandler(value) {
  if (isObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return value
}
