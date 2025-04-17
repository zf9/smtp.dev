const https = require('https');
const config = require('./config');

/**
 * Make an HTTP request to the SMTP.dev API
 * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {string} path - API endpoint path
 * @param {Object} [data] - Request body data
 * @param {Object} [queryParams] - Query parameters
 * @returns {Promise<Object>} Response data
 */
async function request(method, path, data = null, queryParams = {}) {
  const apiKey = config.getApiKey();
  if (!apiKey) {
    throw new Error('API key not configured. Call config.configure("your_api_key") first.');
  }

  // Build URL with query parameters
  let url = `${config.getBaseUrl()}${path}`;
  const queryParamsString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  if (queryParamsString) {
    url += `?${queryParamsString}`;
  }

  const options = {
    method: method,
    headers: {
      'X-API-KEY': apiKey,
      'Accept': 'application/json'
    }
  };

  if (data) {
    const jsonData = JSON.stringify(data);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = Buffer.byteLength(jsonData);
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 204) {
          if (res.statusCode === 204 || responseData.length === 0) {
            // No content response
            resolve({});
          } else {
            try {
              const jsonResponse = JSON.parse(responseData);
              resolve(jsonResponse);
            } catch (e) {
              // Not JSON, return as is (for binary data like downloads)
              resolve(responseData);
            }
          }
        } else {
          let errorMessage = `API request failed with status ${res.statusCode}`;
          try {
            const errorData = JSON.parse(responseData);
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // Not JSON
          }
          
          const error = new Error(errorMessage);
          error.statusCode = res.statusCode;
          error.responseData = responseData;
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Download a file from the API
 * @param {string} path - API endpoint path
 * @param {Object} [queryParams] - Query parameters
 * @returns {Promise<Buffer>} File data as buffer
 */
async function downloadFile(path, queryParams = {}) {
  const apiKey = config.getApiKey();
  if (!apiKey) {
    throw new Error('API key not configured. Call config.configure("your_api_key") first.');
  }

  // Build URL with query parameters
  let url = `${config.getBaseUrl()}${path}`;
  const queryParamsString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  if (queryParamsString) {
    url += `?${queryParamsString}`;
  }

  const options = {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 204) {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        } else {
          const error = new Error(`API request failed with status ${res.statusCode}`);
          error.statusCode = res.statusCode;
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

module.exports = {
  request,
  downloadFile
}; 