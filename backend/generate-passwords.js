const bcrypt = require('bcryptjs');

// Generate bcrypt hashes for test passwords
const passwords = {
  customer: 'customer123',
  admin: 'admin123'
};

async function generateHashes() {
  console.log('Generating bcrypt hashes for test passwords...\n');
  
  for (const [user, password] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${user} (${password}):`);
    console.log(hash);
    console.log();
  }
}

generateHashes().catch(console.error);
