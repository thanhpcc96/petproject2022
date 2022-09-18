const { defaults: tsjPreset } = require("ts-jest/presets")
const expoPreset = require("jest-expo/jest-preset")

module.exports = {
  ...tsjPreset,
  ...expoPreset,
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "/e2e",
    "@react-native",
  ],
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", __dirname],
  setupFiles: ["<rootDir>/test/setup.ts"],
}
