'use strict'

export default class DataGenerator {
  /**
   * The service registry is used to make data generators available to other
   * generators. If a generator does not need access to other generators the
   * serviceRegistry my be left empty
   */
  constructor(
    serviceRegistry = {},
    args = { unique: true, maxUniqueTries: 100 }
  ) {
    this.serviceRegistry = serviceRegistry

    // if set to a true value the data generator should return unique values for each
    // 'instanceId'.
    this.unique = args.unique

    // defines how many tries the generator will do for getting a unique value until it throws an error
    this.maxUniqueTries = args.maxUniqueTries

    this.context = {}
  }

  /**
   * Resets the context. The context stores the already generated data and is used
   * also to check if data is unique.
   */
  clearContext() {
    this.context = {}
  }

  /**
   * Generates the value
   * @param instanceId {string} The testcase instance id. for the same instance id the same data object
   * will be returned. If this i undefined then always a new value will be created.
   * @param data {object} The already generated data/object tree.
   * @param args {object} Any arguments the generator may need
   * @returns data {object} The genrated data. If the data could not be generated because of missing data
   * then the generator should return 'undefined'. So it could be called later. This may be the case if the generator
   * needs referenced data which is not generated yet.
   */
  // eslint-disable-next-line no-unused-vars
  generate(instanceId, data, args) {}

  /**
   * Returns the context of this generator. So you have the complete data generated
   */
  getModel() {
    return this.context
  }
}
