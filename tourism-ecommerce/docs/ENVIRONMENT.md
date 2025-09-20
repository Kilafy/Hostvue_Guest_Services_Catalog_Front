# Environment Configuration

This document describes the environment variables used in the Tourism E-commerce Platform.

## Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` according to your environment.

## Environment Variables

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL (client-side) | `https://guests-services.munnity.app/api` | `https://api.example.com/v1` |
| `API_BASE_URL` | Backend API base URL (server-side) | Uses `NEXT_PUBLIC_API_BASE_URL` | `https://api.example.com/v1` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name | `Tourism E-commerce Platform` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |
| `NODE_ENV` | Environment mode | `development` |

## Variable Usage

### Client-side vs Server-side

- **`NEXT_PUBLIC_*`** variables are available in the browser (client-side)
- **Non-prefixed** variables are only available on the server-side

### API Configuration

The API base URL is used in multiple places:

1. **Client-side API calls** (`src/services/api.ts`): Uses `NEXT_PUBLIC_API_BASE_URL`
2. **Server-side API routes** (`src/app/api/*/route.ts`): Uses `API_BASE_URL` with fallback to `NEXT_PUBLIC_API_BASE_URL`
3. **Utility functions** (`src/lib/api.ts`): Uses `NEXT_PUBLIC_API_BASE_URL`

## Environment-specific Configuration

### Development
```env
NEXT_PUBLIC_API_BASE_URL=https://guests-services.munnity.app/api
NODE_ENV=development
```

### Production
```env
NEXT_PUBLIC_API_BASE_URL=https://production-api.example.com/api
NODE_ENV=production
```

### Local Development with Local Backend
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NODE_ENV=development
```

## Security Notes

- Never commit `.env.local` or `.env.production` files to the repository
- Use `.env.example` as a template for required variables
- Only use `NEXT_PUBLIC_*` prefix for variables that are safe to expose to the browser
- Sensitive configuration should use server-side only variables
