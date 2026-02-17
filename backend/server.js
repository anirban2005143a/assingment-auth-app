const http = require("http");
const app = require("./app");
const connectToDb = require("./db/db");
const port = process.env.PORT || 5000;

const server = http.createServer(app);

// initializeSocket(server);

server.listen(port, async () => {
  try {
    await connectToDb();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
