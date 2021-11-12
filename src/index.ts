import "reflect-metadata";
import { join as joinPaths } from "path";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import dbConfig from "./config/database";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.set("views", joinPaths(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(joinPaths(__dirname, "public")));

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: "/swagger.json",
		},
	})
);

app.use(Router);

createConnection(dbConfig)
	.then((connection) => {
		console.log(connection);

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log("Unable to connect to db", err);

		process.exit(1);
	});
