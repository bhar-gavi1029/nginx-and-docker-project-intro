const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
const port = 3000;

// Identify this container replica using the APP_NAME environment variable or container hostname
const replicapp = process.env.APP_NAME || os.hostname();

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - served by ${replicapp}`);
    next();
});

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("index.html missing on disk");
    }
});

// Container Healthcheck Endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "UP", 
        timestamp: new Date().toISOString() 
    });
});

// Dynamic cluster details for dashboard
app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: "healthy",
        serverName: replicapp,
        hostname: os.hostname(),
        platform: os.platform(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`Express replica (${replicapp}) listening on port ${port}`);
});