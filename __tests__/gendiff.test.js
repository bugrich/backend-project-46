import { genDiff } from '../src/index.js'
import { getFixturePath } from '../src/getFixturePath.js'

test('gendiff\'s main flow', () => {
  const result = genDiff(
    getFixturePath('testfile1.json'),
    getFixturePath('testfile2.json'),
  )
  expect(result).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`)
})
