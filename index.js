import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import product from "./api/movies.js";

config();

const app = express();
app.use(json());
app.use(cors());

const port = process.env.API_PORT || 8080;

app.use("/api/movies", product);

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
