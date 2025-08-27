import Ajv from "ajv";

describe("Users API Contract Tests", () => {
  it("should match the user schema", () => {
    cy.fixture("userSchema.json").then((schema) => {
      const ajv = new Ajv();
      const validate = ajv.compile(schema);

      cy.request("http://localhost:3000/users").then((response) => {
        expect(response.status).to.eq(200);

        const valid = validate(response.body);
        if (!valid) {
          throw new Error("Schema validation failed: " + JSON.stringify(validate.errors));
        }
      });
    });
  });
});
