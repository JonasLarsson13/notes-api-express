import "dotenv/config";

import express from "express";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

import api from "./router/index.js";
import db from "./db/db.js";
const apiDocs = JSON.parse(
  await readFile(new URL("./docs/api-docs.json", import.meta.url))
);

const app = express();

app.use(express.json());

app.use("/api", api);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(apiDocs));

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT}`);
});
