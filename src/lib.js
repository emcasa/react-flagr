export async function fetchFlag(flagKey, entityID, {
  url,
  fetch = process.browser && window.fetch
} = {}) {
  const params = {
    flagKey,
    entityID,
    enableDebug: false
  }
  const response = await fetch(`${url}/api/v1/evaluation`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  })
  return response.json()
}

/**
 * @param {String[]} flagKeys       Flags to fetch
 * @param {String}   entityID       Unique identifier
 * @param {Object}   options
 * @param {String}   options.url    Flagr host
 * @param {Function} options.fetch  fetch-like function
 */
export async function fetchFlagBatch(flagKeys, entityID, {
  url,
  fetch = process.browser && window.fetch
} = {}) {
  const params = {
    flagKeys,
    entities: {entityID},
    enableDebug: false
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
