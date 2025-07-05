const https = require('https');
const { execSync } = require('child_process');

const domain = 'cyanbluefilms.com';
const urlsToCheck = [
  '/',
  '/photo',
  '/film',
  '/about',
  '/contact'
];

// Check DNS records
console.log('Checking DNS records...');
try {
  const dnsResult = execSync(`dig +short ${domain}`).toString().trim();
  console.log(`DNS resolution: ${dnsResult}`);
  
  if (!dnsResult) {
    throw new Error('DNS resolution failed');
  }
} catch (error) {
  console.error('❌ DNS check failed:', error.message);
  process.exit(1);
}

// Check HTTPS
console.log('\nChecking HTTPS configuration...');
urlsToCheck.forEach(path => {
  const url = `https://${domain}${path}`;
  https.get(url, (res) => {
    console.log(`${url} - ${res.statusCode}`);
    
    if (res.statusCode !== 200) {
      console.error(`❌ Unexpected status code for ${url}: ${res.statusCode}`);
      process.exit(1);
    }
    
    // Check if it's the last URL
    if (path === urlsToCheck[urlsToCheck.length - 1]) {
      console.log('✅ All checks passed successfully!');
    }
  }).on('error', (err) => {
    console.error(`❌ HTTPS error for ${url}: ${err.message}`);
    process.exit(1);
  });
});
