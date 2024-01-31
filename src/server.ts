import express from "express";
const HTTP_PORT = 3333;

const app = express();

app.get("/", (request, response) => {
  return response.send("Hello World!");
});

app.listen(HTTP_PORT, () => {
  console.log(`[HTTP Server running in port ${HTTP_PORT}]`);
});
