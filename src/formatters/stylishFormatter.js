import { isObject } from '../isObject.js'

const INDENT_NUMBER = 4

export function stylish(diffTree) {
  return `{\n${formatStylish(diffTree)}\n}`
}

function formatStylish(diffTree, depth = 1) {
  const LEFT_INDENTATION = 2
  const indent = ' '.repeat(depth * INDENT_NUMBER - LEFT_INDENTATION)

  const formattedDiff = diffTree
    .flatMap(({ type, key, children, value, oldValue, newValue }) => {
      switch (type) {
        case 'removed':
          if (isObject(value))
            return [
              `${indent}- ${key}: {\n${formatValue(
                value,
                depth + 1,
              )}\n${indent}  }`,
            ]
          return `${indent}- ${key}: ${formatValue(value)}`

        case 'added':
          if (isObject(value))
            return [
              `${indent}+ ${key}: {\n${formatValue(
                value,
                depth + 1,
              )}\n${indent}  }`,
            ]
          return `${indent}+ ${key}: ${formatValue(value)}`

        case 'updated':
          if (isObject(oldValue) && isObject(newValue)) {
            return [
              `${indent}- ${key}: {\n${formatValue(
                oldValue,
                depth + 1,
              )}\n${indent}  }`,
              `${indent}+ ${key}: {\n${formatValue(
                newValue,
                depth + 1,
              )}\n${indent}  }`,
            ]
          }
          else if (isObject(oldValue)) {
            return [
              `${indent}- ${key}: {\n${formatValue(
                oldValue,
                depth + 1,
              )}\n${indent}  }`,
              `${indent}+ ${key}: ${formatValue(newValue)}`,
            ]
          }
          else if (isObject(newValue)) {
            return [
              `${indent}- ${key}: ${formatValue(oldValue)}`,
              `${indent}+ ${key}: {\n${formatValue(
                newValue,
                depth + 1,
              )}\n${indent}  }`,
            ]
          }
          else {
            return [
              `${indent}- ${key}: ${formatValue(oldValue)}`,
              `${indent}+ ${key}: ${formatValue(newValue)}`,
            ]
          }

        case 'unchanged':
          if (isObject(value))
            return [
              `${indent}  ${key}: {\n${formatValue(
                value,
                depth + 1,
              )}\n${indent}  }`,
            ]
          return `${indent}  ${key}: ${value}`

        case 'nested':
          return [
            `${indent}  ${key}: {\n${formatStylish(
              children,
              depth + 1,
            )}\n${indent}  }`,
          ]
      }
    })
    .join('\n')
  return formattedDiff
}

function formatValue(value, depth = 0) {
  const currentIndent = ' '.repeat(depth * INDENT_NUMBER)

  if (isObject(value)) {
    return Object.entries(value)
      .map(([k, v]) => {
        if (isObject(v)) {
          const newValue = formatValue(v, depth + 1)
          return `${currentIndent}${k}: {\n${newValue}\n${currentIndent}}`
        }
        else {
          return `${currentIndent}${k}: ${v}`
        }
      })
      .join('\n')
  }
  else {
    return value
  }
}
