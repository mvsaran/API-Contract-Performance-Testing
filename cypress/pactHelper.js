const path = require("path");
const { Pact } = require("@pact-foundation/pact");

const provider = new Pact({
  port: 1234,
  consumer: "PatientUI",     // name of your consumer
  provider: "PatientAPI",    // name of your provider
  dir: path.resolve(process.cwd(), "pact/pacts"),
  log: path.resolve(process.cwd(), "pact/logs", "pact.log"),
  logLevel: "info",
});

module.exports = (on, config) => {
  on("task", {
    setupPact() {
      return provider.setup();
    },
    addInteraction(interaction) {
      return provider.addInteraction(interaction);
    },
    verifyPact() {
      return provider.verify();
    },
    finalizePact() {
      return provider.finalize();
    },
  });
};
