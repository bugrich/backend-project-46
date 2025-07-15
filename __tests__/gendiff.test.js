import { buildDiff, genDiff } from '../src/index.js'
import { getFixturePath } from '../src/getFixturePath.js'

test("gendiff's main flow", () => {
  const result = genDiff(
    getFixturePath('testfile1.json'),
    getFixturePath('testfile2.json')
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

test('gendiff with yaml/yml files', () => {
  const result = genDiff(
    getFixturePath('testfile1.yml'),
    getFixturePath('testfile2.yaml')
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

test('gendiff recursive feature', () => {
  const result = genDiff(
    getFixturePath('recursiveTest1.json'),
    getFixturePath('recursiveTest2.yml')
  )
  console.log(result)

  expect(result).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`)
})
