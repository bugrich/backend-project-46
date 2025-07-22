import { isObject } from '../isObject.js'

export function plain(diffTree, parent = '') {
  const getLine = (parent, property, type) => {
    return `Property '${parent}${property}' was ${type}`
  }

  const result = diffTree
    .flatMap(({ key, type, value, children, oldValue, newValue }) => {
      switch (type) {
        case 'removed':
          return getLine(parent, key, type)

        case 'added':
          return (
            getLine(parent, key, type) + ` with value: ${valueHandler(value)}`
          )

        case 'updated':
          return (
            getLine(parent, key, type)
            + `. From ${valueHandler(oldValue)} to ${valueHandler(newValue)}`
          )

        case 'unchanged':
          return []

        case 'nested':
          return plain(children, parent + `${key}.`)
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
