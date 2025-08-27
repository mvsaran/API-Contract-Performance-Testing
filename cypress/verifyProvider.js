// verifyProvider.js
const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

const pactFile = path.resolve(process.cwd(),
  'pacts/CypressFHIRConsumer-HAPIFHIRProvider.json'
);

new Verifier({
  provider: 'HAPIFHIRProvider',
  providerBaseUrl: 'https://hapi.fhir.org/baseR4',
  pactUrls: [pactFile],
})
  .verify()
  .then(() => console.log('✅ Provider verification successful'))
  .catch((e) => {
    console.error('❌ Provider verification failed:', e);
    process.exit(1);
  });
