const config = require("config");
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");
const { formatDataToTableView } = require("./helper");

const app = express();
const PORT = 3000;

if (config.get("env") !== "production") {
    const morgan = require("morgan");
    const errorHandler = require("errorhandler");
    app.use(morgan("dev"));
    app.use(errorHandler());
}

app.use(bodyParser.json());

const modelsPath = path.resolve(__dirname, "_openai", "models.json");

app.get("*", async (req, res) => {
    try {
        const jsonData = JSON.parse(await fs.readFile(modelsPath, "utf8")).data;
        const formattedTable = formatDataToTableView(jsonData);
        res.status(200).send(formattedTable);
    } catch (error) {
        console.error(error);
        res.status(500).send(`
      <h1>Internal Server Error</h1>
      <p>Could not find models.json file. Please make sure you have a models.json file in the _openai folder.</p>
      <p>${error}</p>
    `);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
