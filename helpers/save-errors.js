const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

const logError = (err, name) => {
    const errorLogPath = path.join(__dirname, '..', 'logs', 'errors');
    ensureDirectoryExists(errorLogPath);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const timestamp = `${year}${month}${day} ${hour}${minutes}`;
    const errorFileName = `error_${timestamp}.txt`;
    const fullErrorLogPath = path.join(errorLogPath, errorFileName);
    fs.writeFileSync(fullErrorLogPath, `**Error en: ${name}**\nDescripcion:\n${err.toString()}`);
}

module.exports = {
    logError
}