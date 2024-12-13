# Price People Pay Backend

A backend service that manages pricing data and user interactions. Built with Express.js and uses Neon Database for data storage.

## Features

- RESTful API endpoints for pricing data management
- JWT-based authentication
- WebSocket support for real-time updates
- Database integration with Neon Serverless Postgres
- Comprehensive test coverage with Jest
- Docker support for containerization

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm or yarn
- Docker (optional, for containerization)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wza15046319911/price-people-pay-backend.git
cd price-people-pay-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` file with your configuration values.

## Development

Start the development server:
```bash
npm start
```

### Running Tests

Run the test suite:
```bash
npm test
```

### Linting

Run ESLint:
```bash
npm run lint
```

Fix auto-fixable issues:
```bash
npm run lint:fix
```

## Docker Support

Build the Docker image:
```bash
docker build -t price-people-pay-backend .
```

Run the container:
```bash
docker run -p 3000:3000 price-people-pay-backend
```

## Project Structure

- `/api` - Main API implementation
  - `/database` - Database configuration and models
  - `/routes` - API route handlers
  - `/services` - Business logic services
- `jest.config.js` - Jest testing configuration
- `babel.config.json` - Babel configuration
- `vercel.json` - Vercel deployment configuration

## Technology Stack

- Express.js - Web framework
- Neon Database - Serverless Postgres database
- Jest - Testing framework
- ESLint - Code linting
- Babel - JavaScript compiler
- WebSocket - Real-time communication
- JWT - Authentication

## Possible Improvements
Split the existing cars table into two tables. The first table should include car_id and car_maker. The second table should contain all information related to a specific maker. The two tables should be connected via the car_maker.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
