/*const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {

    console.log("Looking for file at:", path.join(__dirname, 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("app reloaded")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); */

const replicapp = process.env.APP_NAME;

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    console.log("Looking for file at:", filePath);

    // Debugging step: Check if Node.js can actually see the file
    if (fs.existsSync(filePath)) {
        console.log("File FOUND by Node.js! Attempting to send...");
        res.sendFile(filePath);
    } else {
        console.log("File NOT FOUND by Node.js. Check for hidden extensions or permissions.");
        res.send("File missing on disk");
    }
    console.log(`request served by ${replicapp}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});