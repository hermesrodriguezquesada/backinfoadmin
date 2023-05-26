const app = require('./app');

const PORT = process.env.port || 4000;
app.listen(PORT);
console.log(`Server listen on port ${PORT}`);