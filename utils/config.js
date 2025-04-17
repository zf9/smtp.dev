const BASE_URL = 'https://api.smtp.dev';

let apiKey = null;

/**
 * Configure the API client with your API key
 * @param {string} key - Your SMTP.dev API key
 */
function configure(key) {
  apiKey = key;
}

/**
 * Get the current API key
 * @returns {string|null} The configured API key
 */
function getApiKey() {
  return apiKey;
}

/**
 * Get the base URL for API requests
 * @returns {string} The base URL
 */
function getBaseUrl() {
  return BASE_URL;
}

module.exports = {
  configure,
  getApiKey,
  getBaseUrl
}; 