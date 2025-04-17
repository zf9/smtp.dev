# SMTP.dev API Utilities

A Node.js utility package for interacting with the [SMTP.dev](https://smtp.dev) API.

## Installation

No installation needed as these utilities are part of your project.

## Configuration

Before using the utilities, you need to configure your API key:

```javascript
const utils = require('./utils');

// Configure your API key
utils.domains.configure('smtplabs_your_api_key_here');
```

## Usage Examples

### Domains

```javascript
const { domains } = require('./utils');

// List all domains
const allDomains = await domains.list();

// Create a new domain
const newDomain = await domains.create({
  domain: 'example.com',
  isActive: true
});

// Get domain by ID
const domain = await domains.get('domain_id');

// Update domain
const updatedDomain = await domains.update('domain_id', {
  isActive: false
});

// Delete domain
await domains.remove('domain_id');
```

### Accounts

```javascript
const { accounts } = require('./utils');

// List all accounts
const allAccounts = await accounts.list();

// Create a new account
const newAccount = await accounts.create({
  address: 'user@example.com',
  isActive: true
});

// Get account by ID
const account = await accounts.get('account_id');

// Update account
const updatedAccount = await accounts.update('account_id', {
  isActive: false,
  quota: 50
});

// Delete account
await accounts.remove('account_id');
```

### Mailboxes

```javascript
const { mailboxes } = require('./utils');

// List all mailboxes for an account
const allMailboxes = await mailboxes.list('account_id');

// Create a new mailbox
const newMailbox = await mailboxes.create('account_id', {
  name: 'Inbox'
});

// Get mailbox by ID
const mailbox = await mailboxes.get('account_id', 'mailbox_id');

// Update mailbox
const updatedMailbox = await mailboxes.update('account_id', 'mailbox_id', {
  name: 'Archive'
});

// Delete mailbox
await mailboxes.remove('account_id', 'mailbox_id');
```

### Messages

```javascript
const { messages } = require('./utils');

// List all messages in a mailbox
const allMessages = await messages.list('account_id', 'mailbox_id');

// Get message by ID
const message = await messages.get('account_id', 'mailbox_id', 'message_id');

// Update message (mark as read)
const updatedMessage = await messages.update('account_id', 'mailbox_id', 'message_id', {
  isRead: true
});

// Get message source
const source = await messages.getSource('account_id', 'mailbox_id', 'message_id');

// Download message attachment
const attachmentBuffer = await messages.downloadAttachment(
  'account_id',
  'mailbox_id',
  'message_id',
  'attachment_id'
);

// Or save to file
await messages.downloadAttachment(
  'account_id',
  'mailbox_id',
  'message_id',
  'attachment_id',
  './attachment.pdf'
);

// Download message as .eml
const messageFile = await messages.download(
  'account_id',
  'mailbox_id',
  'message_id',
  './message.eml'
);

// Move message to another mailbox
await messages.move('account_id', 'source_mailbox_id', 'message_id', 'target_mailbox_id');

// Delete message
await messages.remove('account_id', 'mailbox_id', 'message_id');
```

### Tokens

```javascript
const { tokens } = require('./utils');

// List all tokens
const allTokens = await tokens.list();

// Create a new token
const newToken = await tokens.create({
  name: 'API Integration',
  description: 'Used for automated testing'
});

// Get token by ID
const token = await tokens.get('token_id');

// Delete token
await tokens.remove('token_id');
```

## Error Handling

All API requests return promises that you can handle with try/catch:

```javascript
try {
  const domains = await utils.domains.list();
  console.log(domains);
} catch (error) {
  console.error('API Error:', error.message);
  console.error('Status Code:', error.statusCode);
}
```

## API Reference

For complete API documentation, visit [SMTP.dev API Documentation](https://smtp.dev/docs/api). 