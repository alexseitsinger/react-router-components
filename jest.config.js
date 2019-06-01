module.exports = {
  setupFiles: ["./jest.setup.js"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist",
  ],
  testRegex: "\\.test\\.js",
}
