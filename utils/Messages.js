const apiClient = require('./apiClient');
const fs = require('fs');
const path = require('path');

/**
 * List messages in a mailbox
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {Object} [options] - Filter options
 * @param {string} [options.subject] - Filter by message subject
 * @param {string} [options.from] - Filter by sender
 * @param {string} [options.to] - Filter by recipient
 * @param {number} [options.page] - The collection page number
 * @returns {Promise<Object>} List of messages with pagination
 */
async function list(accountId, mailboxId, options = {}) {
  return apiClient.request('GET', `/accounts/${accountId}/mailboxes/${mailboxId}/messages`, null, options);
}

/**
 * Get a message by ID
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @returns {Promise<Object>} Message data
 */
async function get(accountId, mailboxId, messageId) {
  return apiClient.request('GET', `/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}`);
}

/**
 * Delete a message
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @returns {Promise<Object>} Empty response on success
 */
async function remove(accountId, mailboxId, messageId) {
  return apiClient.request('DELETE', `/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}`);
}

/**
 * Update a message
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @param {Object} updateData - Data to update
 * @param {boolean} [updateData.isRead] - Mark message as read/unread
 * @returns {Promise<Object>} Updated message
 */
async function update(accountId, mailboxId, messageId, updateData) {
  return apiClient.request('PATCH', `/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}`, updateData);
}

/**
 * Get message source
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @returns {Promise<Object>} Message source
 */
async function getSource(accountId, mailboxId, messageId) {
  return apiClient.request('GET', `/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}/source`);
}

/**
 * Download a message attachment
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @param {string} attachmentId - Attachment identifier
 * @param {string} [outputPath] - Path to save the attachment (if not provided, returns buffer)
 * @returns {Promise<Buffer|string>} Attachment buffer or path to saved file
 */
async function downloadAttachment(accountId, mailboxId, messageId, attachmentId, outputPath) {
  const buffer = await apiClient.downloadFile(`/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}/attachments/${attachmentId}`);
  
  if (outputPath) {
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  }
  
  return buffer;
}

/**
 * Download a message as .eml file
 * @param {string} accountId - Account identifier
 * @param {string} mailboxId - Mailbox identifier
 * @param {string} messageId - Message identifier
 * @param {string} [outputPath] - Path to save the message (if not provided, returns buffer)
 * @returns {Promise<Buffer|string>} Message buffer or path to saved file
 */
async function download(accountId, mailboxId, messageId, outputPath) {
  const buffer = await apiClient.downloadFile(`/accounts/${accountId}/mailboxes/${mailboxId}/messages/${messageId}/download`);
  
  if (outputPath) {
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  }
  
  return buffer;
}

/**
 * Move a message to a different mailbox
 * @param {string} accountId - Account identifier
 * @param {string} sourceMailboxId - Source mailbox identifier
 * @param {string} messageId - Message identifier
 * @param {string} targetMailboxId - Target mailbox identifier
 * @returns {Promise<Object>} Response data
 */
async function move(accountId, sourceMailboxId, messageId, targetMailboxId) {
  return apiClient.request('PUT', `/accounts/${accountId}/mailboxes/${sourceMailboxId}/messages/${messageId}/move`, {
    mailbox: targetMailboxId
  });
}

module.exports = {
  list,
  get,
  remove,
  update,
  getSource,
  downloadAttachment,
  download,
  move
};
