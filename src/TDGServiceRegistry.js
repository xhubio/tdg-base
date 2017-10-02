'use strict'

import assert from 'assert'

/**
 * The service registry stores all the generators by there name. So each generator could ask the service
 * for an other generator by a service name
 */

export default class TDGServiceRegistry {
  constructor() {
    this.services = new Map()
  }

  registerGenerator(serviceName, generator) {
    assert.ok(serviceName)
    assert.ok(generator)

    if (this.services.has(serviceName)) {
      // A service with the same name was already registred
      // eslint-disable-next-line no-console
      console.warn(
        `There was already a generator registered with the name '${serviceName}'`
      )
    }

    this.services.set(serviceName, generator)
  }

  getGenerator(serviceName) {
    assert.ok(serviceName)

    if (!this.services.has(serviceName)) {
      throw new Error(
        `There was no generator registered with the name '${serviceName}'`
      )
    }

    return this.services.get(serviceName)
  }
}
