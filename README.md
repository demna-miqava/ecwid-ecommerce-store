# Lightspeed Assignment

E-commerce storefront application built with Vue 3, TypeScript, and Ecwid API.

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Pinia** for state management
- **Vue Router** for routing
- **TanStack Query** for data fetching and caching
- **Vitest** for testing

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm or yarn
- Ecwid store credentials

## Environment Setup

1. Copy the example environment file

2. Configure your Ecwid credentials in `.env`:
   ```
   VITE_ECWID_STORE_ID=your_store_id
   VITE_ECWID_API_TOKEN=your_api_token
   VITE_ECWID_API_URL=your_api_url
   ```

## Installation

```sh
npm install
```

## Development

Start the development server:

```sh
npm run dev
```

## Testing

Run tests:

```sh
npm run test
```

Run tests with UI:

```sh
npm run test:ui
```
