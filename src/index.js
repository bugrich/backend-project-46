import { getFileData } from './getFileData.js'

export const genDiff = (filepath1, filepath2) => {
  const file1Data = JSON.parse(getFileData(filepath1))
  const file2Data = JSON.parse(getFileData(filepath2))

  return [file1Data, file2Data]
}
