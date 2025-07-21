import { isObject } from '../src/isObject.js'

export function stylish(diffTree) {
  return `{\n${formatStylish(diffTree)}\n}`
}

function formatStylish(diffTree, depth = 1) {
  // console.dir(diffTree, { depth: null })

  const indent = ' '.repeat(depth * 4 - 2)

  const formattedDiff = diffTree
    .flatMap((node) => {
      const { type, key, children, value, newValue, oldValue } = node

      switch (type) {
        case 'removed':
          if (isObject(value))
            return [
              `${indent}- ${key}: {\n${formatValue(
                value,
                depth + 1
              )}\n${indent}  }`,
            ]
          return `${indent}- ${key}: ${formatValue(value)}`

        case 'added':
          if (isObject(value))
            return [
              `${indent}+ ${key}: {\n${formatValue(
                value,
                depth + 1
              )}\n${indent}  }`,
            ]
          return `${indent}+ ${key}: ${formatValue(value)}`

        case 'updated':
          if (isObject(oldValue)) {
            return [
              `${indent}- ${key}: {\n${formatValue(
                oldValue,
                depth + 1
              )}\n${indent}  }`,
              `${indent}+ ${key}: ${formatValue(newValue)}`,
            ]
          } else if (isObject(newValue)) {
            return [
              `${indent}- ${key}: ${formatValue(oldValue)}`,
              `${indent}+ ${key}: {\n${formatValue(
                newValue,
                depth + 1
              )}\n${indent}  }`,
            ]
          } else {
            /* else if (isObject(oldValue) && isObject(newValue)) {
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
          } */
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
                depth + 1
              )}\n${indent}  }`,
            ]
          return `${indent}  ${key}: ${value}`

        case 'nested':
          return [
            `${indent}  ${key}: {\n${formatStylish(
              children,
              depth + 1
            )}\n${indent}  }`,
          ]
      }
    })
    .join('\n')
  // console.log(formattedDiff)
  return formattedDiff
}

function formatValue(value1, depth = 0) {
  const currentIndent = ' '.repeat(depth * 4)
  // console.log(value1)

  if (isObject(value1)) {
    const entries = Object.entries(value1)
    return entries
      .map(([key, value]) => {
        if (isObject(value)) {
          const newValue = formatValue(value, depth + 1)
          return `${currentIndent}${key}: {\n${newValue}\n${currentIndent}}`
        } else {
          return `${currentIndent}${key}: ${value}`
        }
      })
      .join('\n')
  } else {
    return value1
  }
}
