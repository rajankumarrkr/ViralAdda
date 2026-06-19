# Deployment

## Server

1. Provision MongoDB Atlas or a managed MongoDB instance.
2. Create a Telegram bot with BotFather.
3. Add the bot as an admin in a private Telegram channel.
4. Set production environment variables:
   ```bash
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<mongodb-uri>
   JWT_SECRET=<long-random-secret>
   BOT_TOKEN=<bot-token>
   CHANNEL_ID=<private-channel-id>
   CORS_ORIGIN=https://admin.yourdomain.com
   ```
5. Build and start:
   ```bash
   npm --workspace server run build
   npm --workspace server run start
   ```

## Admin Panel

1. Set `VITE_API_BASE_URL=https://api.yourdomain.com/api`.
2. Build:
   ```bash
   npm --workspace client/admin-panel run build
   ```
3. Deploy `client/admin-panel/dist` to static hosting.

## Mobile App

1. Set `API_BASE_URL=https://api.yourdomain.com/api`.
2. Configure Android/iOS signing.
3. Build release binaries using the React Native platform tooling.

## Security Checklist

- Use long random JWT secrets.
- Keep Telegram bot token server-side only.
- Restrict CORS to trusted origins.
- Enable HTTPS everywhere.
- Rotate secrets after suspected exposure.
- Use a non-admin MongoDB user for the application.
