const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const modelsPath = path.join(__dirname, '_openai', 'models.json');
const { formatDataToTableView } = require('./helper');

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

app.get('*', (req, res) => {
    let jsonData = JSON.parse(fs.readFileSync(modelsPath, "utf8")).data;
    const formattedTable = formatDataToTableView(jsonData);
    return res.status(200).send(formattedTable);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


