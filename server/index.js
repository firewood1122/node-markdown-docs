const fs = require('fs');
const path = require('path');
const util = require('util');
const express = require('express');
const markdownIt = require('markdown-it');
const consola = require('consola');
const opn = require('opn');

const readAsync = util.promisify(fs.readFile);
const existsAsync = util.promisify(fs.exists);
const baseDir = process.cwd();
const configPath = path.join(baseDir, '.docsrc');

// Generate to html content
const getMarkdown = async (filePath) => {
    const markdown = new markdownIt();
    let content = await readAsync(filePath);
    return markdown.render(content.toString());
};

const app = express();
app.get('/', async (req, res, next) => {
    const filePath = path.join(baseDir, 'README.md');
    const content = await getMarkdown(filePath);
    res.render('index', { content: content });
});

app.get('*.md', async (req, res, next) => {
    const filePath = path.join(baseDir, req.path);
    const content = await getMarkdown(filePath);
    res.render('index', { content: content });
});

async function start() {
    let config = {};
    if (await existsAsync(configPath)) {
        config = JSON.parse(await readAsync(configPath));
    }
    const host = config.host ? config.host : '127.0.0.1';
    const port = config.host ? config.port : 3001;

    app.set('port', port);
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'ejs');

    // Listen the server
    app.listen(port, host);
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
    opn(`http://${host}:${port}`);
};
start();
