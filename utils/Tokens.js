const apiClient = require('./apiClient');

/**
 * List all tokens
 * @param {Object} [options] - Filter options
 * @param {number} [options.page] - The collection page number
 * @returns {Promise<Object>} List of tokens with pagination
 */
async function list(options = {}) {
  return apiClient.request('GET', '/tokens', null, options);
}

/**
 * Create a new token
 * @param {Object} tokenData - Token data
 * @param {string} tokenData.name - A name for the token to identify its purpose
 * @param {string} [tokenData.description] - Optional description of what the token is used for
 * @returns {Promise<Object>} Created token with the token value (only shown once)
 */
async function create(tokenData) {
  return apiClient.request('POST', '/tokens', tokenData);
}

/**
 * Get a token by ID
 * @param {string} tokenId - Token identifier
 * @returns {Promise<Object>} Token data (without the actual token value)
 */
async function get(tokenId) {
  return apiClient.request('GET', `/tokens/${tokenId}`);
}

/**
 * Delete a token
 * @param {string} tokenId - Token identifier
 * @returns {Promise<Object>} Empty response on success
 */
async function remove(tokenId) {
  return apiClient.request('DELETE', `/tokens/${tokenId}`);
}

module.exports = {
  list,
  create,
  get,
  remove
};
