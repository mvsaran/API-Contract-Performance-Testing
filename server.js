const express = require('express');
const app = express();
const port = 1234;

// Mock FHIR Patient endpoint
app.get('/baseR4/Patient', (req, res) => {
  res.json({ entry: [{ resource: { id: 'example-patient' } }] });
});

app.listen(port, () => {
  console.log(`Mock FHIR server running at http://127.0.0.1:${port}/baseR4`);
});
