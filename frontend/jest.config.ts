module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  setupFilesAfterEnv: ["./setupTests.ts"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|vue)$",
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  transformIgnorePatterns: [
    "/node_modules/(?!@kambista|vue-material-design-icons)",
  ],
  testPathIgnorePatterns: ["cypress"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/assets/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
    "\\.(css|scss)$": "<rootDir>/mocks/assets/styleMock.js",
  },
  collectCoverageFrom: [
    "<rootDir>/src/shared/**/*.vue",
    "<rootDir>/src/modules/**/*.vue",
    "<rootDir>/src/pages/**/*.vue",
  ],
};
