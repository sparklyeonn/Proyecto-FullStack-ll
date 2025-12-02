// tests.webpack.js
const testsContext = require.context('./src', true, /\.(test|spec)\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
