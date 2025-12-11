// tests.webpack.js
// Cargar todas las pruebas
const context = require.context('./src', true, /\.test\.(js|jsx)$/);
context.keys().forEach(context);

// Llamar a __karma__.start() SI está definido
if (typeof __karma__ !== 'undefined') {
    __karma__.start();
}