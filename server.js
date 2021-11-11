const path = require("path");
const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname + "/public")));
app.use("/digit", express.json());

app.get("/", (_, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/digit", (req, res) => {
	console.log("Received digit:", req.body.digit);

	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
