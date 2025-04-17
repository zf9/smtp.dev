
const utils = require('./utils/index');
const API_KEY = '';

async function exampleDomainOperations() {
  try {
    utils.configure(API_KEY);
    const account = await utils.accounts.create({
      address: "Hello@domain.com",
      password: "HelloWorld!"
    });
    console.log(account);
  
    
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
  }
}

exampleDomainOperations();