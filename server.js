import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const ALT_PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

function requestHandler(req, res) {
  // Normalize URL to remove query strings and hash
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Health check endpoint
  if (pathname === '/health' || pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // Construct absolute file path
  let filePath = path.join(DIST_DIR, pathname);

  // If path is a directory or root, target index.html
  if (pathname === '/' || pathname === '') {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // SPA Fallback: serve dist/index.html for client-side routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, content) => {
        if (indexErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error: dist/index.html not found. Run npm run build.');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
    }
  });
}

// Start primary server on PORT (e.g. 3000 or process.env.PORT)
const mainServer = http.createServer(requestHandler);
mainServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[HAKI-EYE] Production server running on http://0.0.0.0:${PORT}`);
});

// Also listen on fallback port 4173 if PORT is different (in case cloud health check targets 4173)
if (PORT !== ALT_PORT) {
  const altServer = http.createServer(requestHandler);
  altServer.on('error', (e) => {
    // Silently ignore if port 4173 is already in use
    console.log(`[HAKI-EYE] Secondary port ${ALT_PORT} not bound (${e.code})`);
  });
  altServer.listen(ALT_PORT, '0.0.0.0', () => {
    console.log(`[HAKI-EYE] Fallback server also listening on http://0.0.0.0:${ALT_PORT}`);
  });
}
