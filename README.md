# API Testing with Cypress (Contract Testing) & k6 (Performance Testing)

This project demonstrates **API Contract Testing** and **Performance
Testing** using: - [Cypress](https://www.cypress.io/) for API contract
validation with JSON Schema - [Ajv](https://ajv.js.org/) for schema
validation - [k6](https://k6.io/) for performance/load testing

It uses a sample local API (`http://localhost:3000`) to validate user
contracts and benchmark performance.

-----------------------------------------------------------------------
## Install Required Dependencies

npm install --save-dev cypress

**Ajv (JSON Schema Validation)
npm install ajv**

k6 (Performance/Load Testing)
k6 is not an npm package — it’s a CLI tool. Install it globally:

Linux / Mac (Homebrew):
brew install k6
Windows (Chocolatey):
choco install k6

Local Test Server (http-server as lightweight option)
npm install --save-dev http-server
If you specifically meant json-server (to mock APIs & DB):
npm install --save-dev json-server

------------------------------------------------------------------------

## 📂 Project Structure

    api-testing-contract-performance/
    │── cypress/
    │   ├── e2e/
    │   │   ├── contract/
    │   │   │   └── users_contract.cy.js   # Contract test spec
    │   ├── fixtures/
    │   │   └── userSchema.json            # JSON schema for contract validation
    │   ├── support/
    │   │   └── e2e.js
    │── load-test/
    │   └── users_load_test.js             # k6 performance test script
    │── package.json
    │── README.md

------------------------------------------------------------------------

## 🧩 Contract Testing (with Cypress + Ajv)

Contract testing ensures that the **API response matches the agreed
schema** (structure, data types, mandatory fields).

### Example Spec (`users_contract.cy.js`)

``` javascript
import Ajv from "ajv";
import schema from "../../fixtures/userSchema.json";

describe("Users API Contract Test", () => {
  it("should match the contract", () => {
    cy.request("http://localhost:3000/users").then((response) => {
      const ajv = new Ajv();
      const validate = ajv.compile(schema);
      const valid = validate(response.body);

      expect(valid, JSON.stringify(validate.errors)).to.be.true;
    });
  });
});
```

### Example Schema (`userSchema.json`)

``` json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": { "type": "number" },
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" }
    },
    "required": ["id", "name", "email"]
  }
}
```

### Run Contract Tests

``` bash
npx cypress run --spec "cypress/e2e/contract/users_contract.cy.js"
```

------------------------------------------------------------------------

## 🚀 Performance Testing (with k6)

Performance testing ensures the API can handle expected load.

### Example Load Test (`users_load_test.js`)

``` javascript
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10, // virtual users
  duration: "30s", // test duration
};

export default function () {
  let res = http.get("http://localhost:3000/users");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
```

### Run Load Test

``` bash
k6 run load-test/users_load_test.js
```

------------------------------------------------------------------------

## 🛠 Step-by-Step Execution

1.  Start your local API server (e.g., `json-server`).

    ``` bash
    npx json-server --watch db.json --port 3000
    ```

2.  Run **contract tests** with Cypress.

    ``` bash
    npx cypress open
    ```

3.  Run **performance tests** with k6.

    ``` bash
    k6 run load-test/users_load_test.js
    ```

------------------------------------------------------------------------

## ✅ When to Use This Project

-   Demonstrating **API schema validation** (contract testing)\
-   Benchmarking **API performance** under load\
-   Learning end-to-end API testing with Cypress & k6

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Integrate Pact for consumer-driven contract testing\
-   Run k6 tests in CI/CD (GitHub Actions / Jenkins)\
-   Add test reports (Allure, Mochawesome)
