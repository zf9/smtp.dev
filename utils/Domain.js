const apiClient = require('./apiClient');

/**
 * List all domains
 * @param {Object} [options] - Filter options
 * @param {boolean} [options.isActive] - Filter by active status
 * @param {number} [options.page] - The collection page number
 * @returns {Promise<Object>} List of domains with pagination
 */
async function list(options = {}) {
  return apiClient.request('GET', '/domains', null, options);
}

/**
 * Create a new domain
 * @param {Object} domainData - Domain data
 * @param {string} domainData.domain - Domain name (e.g., "example.com")
 * @param {boolean} [domainData.isActive] - Domain activation status
 * @returns {Promise<Object>} Created domain
 */
async function create(domainData) {
  return apiClient.request('POST', '/domains', domainData);
}

/**
 * Get a domain by ID
 * @param {string} domainId - Domain identifier
 * @returns {Promise<Object>} Domain data
 */
async function get(domainId) {
  return apiClient.request('GET', `/domains/${domainId}`);
}

/**
 * Delete a domain
 * @param {string} domainId - Domain identifier
 * @returns {Promise<Object>} Empty response on success
 */
async function remove(domainId) {
  return apiClient.request('DELETE', `/domains/${domainId}`);
}

/**
 * Update a domain
 * @param {string} domainId - Domain identifier
 * @param {Object} updateData - Data to update
 * @param {boolean} updateData.isActive - Domain activation status
 * @returns {Promise<Object>} Updated domain
 */
async function update(domainId, updateData) {
  return apiClient.request('PATCH', `/domains/${domainId}`, updateData);
}

module.exports = {
  list,
  create,
  get,
  remove,
  update
};
