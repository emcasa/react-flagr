/**
 * @param {String}   flagKey
 * @param {Object}   entity
 * @param {String}   entity.id
 * @param {String}   entity.type
 * @param {Object}   entity.context
 * @param {Object}   options
 * @param {String}   options.url    Flagr host
 * @param {Function} options.fetch  fetch-like function
 * @see https://checkr.github.io/flagr/api_docs/#operation/postEvaluation
 */
export async function fetchFlag(flagKey, entity, {
  url,
  enableDebug = false,
  fetch = process.browser && window.fetch
} = {}) {
  const params = {
    flagKey,
    enableDebug,
    entityID: entity.id,
    entityType: entity.type,
    entityContext: entity.context
  }
  const response = await fetch(`${url}/api/v1/evaluation`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  })
  return response.json()
}

/**
 * @param {String[]} flagKey
 * @param {Object}   entity
 * @param {String}   entity.id
 * @param {String}   entity.type
 * @param {Object}   entity.context
 * @param {Object}   options
 * @param {String}   options.url    Flagr host
 * @param {Function} options.fetch  fetch-like function
 * @see https://checkr.github.io/flagr/api_docs/#operation/postEvaluationBatch
 */
export async function fetchFlagBatch(flagKeys, entity, {
  url,
  enableDebug = false,
  fetch = process.browser && window.fetch
} = {}) {
  const params = {
    flagKeys,
    enableDebug,
    entities: [{
      entityID: entity.id,
      entityType: entity.type,
      entityContext: entity.context,
    }]
  }
  const response = await fetch(`${url}/api/v1/evaluation/batch`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  })
  const {evaluationResults} = await response.json()
  return evaluationResults.reduce((acc, flag) => ({
    ...acc,
    [flag.flagKey]: flag
  }), {})
}
