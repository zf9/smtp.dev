const config = require('./config');
const domains = require('./Domain');
const accounts = require('./Account');
const mailboxes = require('./Mailboxes');
const messages = require('./Messages');
const tokens = require('./Tokens');

// Initialize the config in each module
domains.configure = config.configure;
accounts.configure = config.configure;
mailboxes.configure = config.configure;
messages.configure = config.configure;
tokens.configure = config.configure;

module.exports = {
  domains,
  accounts,
  mailboxes,
  messages,
  tokens,
  configure: config.configure
}; 