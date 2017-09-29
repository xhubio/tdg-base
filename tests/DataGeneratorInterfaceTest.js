'use strict'

import { TDGServiceRegistry } from '../lib/index'
import { DataGeneratorInterface } from '../lib/index'

test('Test error no registry', () => {
  const gen = new DataGeneratorInterface()

  expect(() => {
    gen.getGenerator('myGen')
  }).toThrow('No service registry definend')
})

test('Test error DataGenerator not registered', () => {
  const registry = new TDGServiceRegistry()
  const gen = new DataGeneratorInterface(registry)

  expect(() => {
    gen.getGenerator('myGen')
  }).toThrow(`There was no generator registered with the name 'myGen'`)
})
