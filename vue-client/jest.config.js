// Ref: https://medium.com/touch4it/end-to-end-testing-with-puppeteer-and-jest-ec8198145321

module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:8080"
  },
  testMatch: [
    "**/*.test.js"
  ],
  verbose: true
}