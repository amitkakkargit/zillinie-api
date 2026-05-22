# Zillinie API

This is the Node backend for the Zillinie migration.

## Setup

1. Copy `.env.example` to `.env`.
2. Update `DB_SERVER`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`.
3. Install dependencies:
   ```bash
   cd zillinie-api
   npm install
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

## API endpoints

- `POST /api/auth/login`
- `GET /api/customers`
- `GET /api/health`
