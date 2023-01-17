const server = require('./src/app.js');

server.listen(3001, () => {
  console.log(`[Server]: running on http://localhost:3001`);
  console.log(`[API]: running on http://localhost:3001/api`);
});
