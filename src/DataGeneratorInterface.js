'use strict'

export default class DataGeneratorInterface {
  /**
   * The service registry is used to make data generators available to other
   * generators. If a generator does not need access to other generators the
   * serviceRegistry my be left empty
   */
  constructor(
    serviceRegistry = {
      getGenerator: () => {
        throw new Error('No service registry definend')
      },
    },
    args = { unique: true, maxUniqueTries: 100 }
  ) {
    this.serviceRegistry = serviceRegistry

    // if set to a true value the data generator should return unique values for each
    // 'instanceId'.
    this.unique = args.unique

    // defines how many tries the generator will do for getting a unique value until it throws an error
    this.maxUniqueTries = args.maxUniqueTries

    this.uniqueSet = new Set()

    this.instanceData = new Map()
  }

  /**
   * Returns the Datagenerator registered under the given name. If the generator is not found an error will be thrown
   * @param serviceName {string} The name of the registered data generator
   * @returns generator {object} The generator
   */
  getGenerator(generatorName) {
    const gen = this.serviceRegistry.getGenerator(generatorName)
    if (!gen || gen === undefined) {
      throw new Error(
        `The generator with the name '${generatorName}' was not registered in the registry`
      )
    }
    return gen
  }

  /**
   * Resets the context. The context stores the already generated data and is used
   * also to check if data is unique.
   */
  clearContext() {
    this.uniqueSet = new Set()
    this.instanceData = new Map()
  }

  /**
   * Generates the value and saves it for the given instance
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this i undefined then always a new value will be created.
   * @param data {object} The already generated data/object tree.
   * @param args {object} Any arguments the generator may need
   * @returns data {object} The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  // eslint-disable-next-line no-unused-vars
  generate(instanceId, data, args) {
    if (instanceId && this.instanceData.has(instanceId)) {
      return this.instanceData.get(instanceId)
    }

    const genData = this._doGenerate(instanceId, data, args)

    if (instanceId) {
      this.instanceData.set(instanceId, genData)
    }

    return genData
  }

  /**
   * @see  generate
   */
  // eslint-disable-next-line no-unused-vars
  _doGenerate(instanceId, data, args) {}

  /**
   * Returns the context of this generator. So you have the complete data generated
   */
  getModel() {
    return this.instanceData
  }
}
