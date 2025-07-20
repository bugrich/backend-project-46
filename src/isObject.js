export const isObject = value =>
  value !== null && !Array.isArray(value) && typeof value === 'object'
