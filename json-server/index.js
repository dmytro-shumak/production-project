/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require("fs");
const http = require("node:http");
const https = require("node:https");
const path = require("path");

const jsonServer = require("json-server");

const options = {
  pfx: fs.readFileSync(path.resolve(__dirname, "test_cert.pfx")),
  passphrase: "sample",
  key: fs.readFileSync(path.resolve(__dirname, "private-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "certificate.pem")),
};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

server.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"),
    );
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: "User not found" });
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: e.message });
  }
});

server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "AUTH ERROR" });
  }

  next();
});

const HTTPS_PORT = 8443;
const HTTP_PORT = 8000;

server.use(router);

const httpsServer = https.createServer(options, server);
const httpServer = http.createServer(server);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`server is running on ${HTTPS_PORT} port`);
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`);
});
