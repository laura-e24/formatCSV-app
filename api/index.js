const server = require('./src/app.js');

server.listen(3001, () => {
  console.log(`[Server]: running on port 3001`);
});
