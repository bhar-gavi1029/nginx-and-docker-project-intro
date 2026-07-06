const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)){
    fs.mkdirSync(certsDir, { recursive: true });
}

console.log('Generating self-signed certificate...');
const attrs = [{ name: 'commonName', value: 'localhost' }];

selfsigned.generate(attrs, { days: 365, keySize: 2048 })
    .then(pems => {
        fs.writeFileSync(path.join(certsDir, 'nginx.key'), pems.private);
        fs.writeFileSync(path.join(certsDir, 'nginx.crt'), pems.cert);
        console.log('Certificate generated successfully at ./certs/nginx.crt and ./certs/nginx.key');
    })
    .catch(err => {
        console.error('Failed to generate certificates:', err);
        process.exit(1);
    });
