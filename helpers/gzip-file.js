const zlib = require("zlib");
const path = require("path");
const fs = require("fs");

const files = process.argv.slice(2);
if (files.length < 1) {
    throw new Error("File argument missing.");
}

const sourceFile = path.resolve(files[0]);
if (!fs.existsSync(sourceFile)) {
    throw new Error(`File not found: ${sourceFile}`);
}

process.stdout.write(zlib.gzipSync(fs.readFileSync(sourceFile)));
