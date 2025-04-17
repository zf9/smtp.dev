const apiClient = require('./apiClient');

/**
 * List mailboxes for an account
 * @param {string} accountId - Account identifier
 * @param {Object} [options] - Filter options
 * @param {string} [options.name] - Filter by mailbox name
 * @param {number} [options.page] - The collection page number
 * @returns {Promise<Object>} List of mailboxes with pagination
 */
async function list(accountId, options = {}) {
  return apiClient.request('GET', `/accounts/${accountId}/mailboxes`, null, options);
}

/**
 * Create a new mailbox for an account
 * @param {string} accountId - Account identifier
 * @param {Object} mailboxData - Mailbox data
 * @param {string} mailboxData.name - Mailbox name
 * @returns {Promise<Object>} Created mailbox
 */
async function create(accountId, mailboxData) {
  return apiClient.request('POST', `/accounts/${accountId}/mailboxes`, mailboxData);
}

/**
 * Get a mailbox by ID
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @returns {Promise<Object>} Mailbox data
 */
async function get(accountId, mailboxId) {
  return apiClient.request('GET', `/accounts/${accountId}/mailboxes/${mailboxId}`);
}

/**
 * Delete a mailbox
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @returns {Promise<Object>} Empty response on success
 */
async function remove(accountId, mailboxId) {
  return apiClient.request('DELETE', `/accounts/${accountId}/mailboxes/${mailboxId}`);
}

/**
 * Update a mailbox
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {Object} updateData - Data to update
 * @param {string} updateData.name - New mailbox name
 * @returns {Promise<Object>} Updated mailbox
 */
async function update(accountId, mailboxId, updateData) {
  return apiClient.request('PATCH', `/accounts/${accountId}/mailboxes/${mailboxId}`, updateData);
}

module.exports = {
  list,
  create,
  get,
  remove,
  update
};
