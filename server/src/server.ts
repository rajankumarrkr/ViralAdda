import net from 'net';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import { app } from './app.js';

const findAvailablePort = (startPort: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'EADDRINUSE' || e.code === 'EACCES') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(e);
      }
    });
    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
};

connectDatabase()
  .then(() => {
    const port = env.PORT;
    const server = app.listen(port, () => {
      console.log(`ViralAdda API listening on port ${port}`);
    });

    server.on('error', async (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
        console.error(`Port ${port} is already in use.`);
        console.error(`Please stop the existing process or change PORT in .env`);
        try {
          const availablePort = await findAvailablePort(port + 1);
          console.error(`Suggested available port: ${availablePort}`);
        } catch {
          // Ignore
        }
        process.exit(1);
      } else {
        console.error('Failed to start API', error);
        process.exit(1);
      }
    });
  })
  .catch((error) => {
    console.error('Failed to start API', error);
    process.exit(1);
  });
