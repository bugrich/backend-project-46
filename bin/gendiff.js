#!/usr/bin/env node

import { Command } from 'commander'
import { genDiff } from '../src/index.js'

const program = new Command()

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
  })

program.parse()
