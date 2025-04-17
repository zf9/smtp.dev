const apiClient = require('./apiClient');

/**
 * List all accounts
 * @param {Object} [options] - Filter options
 * @param {string} [options.address] - Filter by account address
 * @param {boolean} [options.isActive] - Filter by active status
 * @param {number} [options.page] - The collection page number
 * @returns {Promise<Object>} List of accounts with pagination
 */
async function list(options = {}) {
  return apiClient.request('GET', '/accounts', null, options);
}

/**
 * Create a new account
 * @param {Object} accountData - Account data
 * @param {string} accountData.address - Email address (e.g., "user@example.com")
 * @param {number} [accountData.quota] - Account quota
 * @param {boolean} [accountData.isActive] - Account activation status
 * @returns {Promise<Object>} Created account
 */
async function create(accountData) {
  return apiClient.request('POST', '/accounts', accountData);
}

/**
 * Get an account by ID
 * @param {string} accountId - Account identifier
 * @returns {Promise<Object>} Account data
 */
async function get(accountId) {
  return apiClient.request('GET', `/accounts/${accountId}`);
}

/**
 * Delete an account
 * @param {string} accountId - Account identifier
 * @returns {Promise<Object>} Empty response on success
 */
async function remove(accountId) {
  return apiClient.request('DELETE', `/accounts/${accountId}`);
}

/**
 * Update an account
 * @param {string} accountId - Account identifier
 * @param {Object} updateData - Data to update
 * @param {number} [updateData.quota] - Account quota
 * @param {boolean} [updateData.isActive] - Account activation status
 * @returns {Promise<Object>} Updated account
 */
async function update(accountId, updateData) {
  return apiClient.request('PATCH', `/accounts/${accountId}`, updateData);
}

module.exports = {
  list,
  create,
  get,
  remove,
  update
};
