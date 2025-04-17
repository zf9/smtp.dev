// Example usage of SMTP.dev API utilities

const utils = require('./index');

// Replace with your actual API key
const API_KEY = 'smtplabs_your_api_key_here';

async function exampleDomainOperations() {
  try {
    // Configure the API
    utils.configure(API_KEY);
    
    console.log('Listing domains...');
    const domains = await utils.domains.list();
    console.log(`Found ${domains.totalItems} domains`);
    
    if (domains.member && domains.member.length > 0) {
      console.log('First domain:', domains.member[0].domain);
    }
    
    // Example: Create a new domain
    // const newDomain = await utils.domains.create({
    //   domain: 'example.com',
    //   isActive: true
    // });
    // console.log('Created new domain:', newDomain.domain);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
  }
}

async function exampleAccountOperations() {
  try {
    // Configure the API
    utils.configure(API_KEY);
    
    console.log('Listing accounts...');
    const accounts = await utils.accounts.list();
    console.log(`Found ${accounts.totalItems} accounts`);
    
    if (accounts.member && accounts.member.length > 0) {
      const accountId = accounts.member[0].id;
      console.log('First account ID:', accountId);
      
      // Get mailboxes for this account
      console.log('Listing mailboxes...');
      const mailboxes = await utils.mailboxes.list(accountId);
      console.log(`Found ${mailboxes.totalItems} mailboxes`);
      
      if (mailboxes.member && mailboxes.member.length > 0) {
        const mailboxId = mailboxes.member[0].id;
        console.log('First mailbox ID:', mailboxId);
        
        // Get messages in this mailbox
        console.log('Listing messages...');
        const messages = await utils.messages.list(accountId, mailboxId);
        console.log(`Found ${messages.totalItems} messages`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
  }
}

// Run the examples
// exampleDomainOperations();
// exampleAccountOperations();

console.log('To use these examples:');
console.log('1. Add your API key to the API_KEY constant');
console.log('2. Uncomment the function call you want to run');
console.log('3. Run this file with Node.js: node example.js'); 