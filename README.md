# E-Commerce Application

A full-stack e-commerce application with a NestJS API backend and React frontend, organized in a Turborepo monorepo.

## Features

- NestJS API with PostgreSQL database
- React frontend with TanStack Router, React Query, and shadcn/ui
- Product listing, shopping cart, and order management
- User authentication
- Turborepo for monorepo management

## Prerequisites

- Node.js 18 or later
- PNPM package manager (`npm install -g pnpm`)
- Docker and Docker Compose (for PostgreSQL database)

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nest-api-cursor
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

4. Generate Prisma client for the API:

```bash
pnpm db:generate
```

5. Apply database migrations:

```bash
pnpm db:migrate
```

### Running the Application

To start both the API and frontend in development mode:

```bash
pnpm dev
```

#### Running API only

```bash
pnpm --filter api dev
```

The API will be available at http://localhost:3001

#### Running Frontend only

```bash
pnpm --filter web dev
```

The frontend will be available at http://localhost:5173

### Building for Production

```bash
pnpm build
```

## Project Structure

```
nest-api-cursor/
├── apps/
│   ├── api/                   # NestJS backend
│   │   ├── prisma/            # Database schema and migrations
│   │   ├── src/               # API source code
│   │   │   ├── prisma/        # Prisma service
│   │   │   ├── users/         # Users module
│   │   │   ├── items/         # Items/products module
│   │   │   ├── orders/        # Orders module
│   │   │   ├── app.module.ts  # Main app module
│   │   │   └── main.ts        # Entry point
│   │   ├── .env               # API environment variables
│   │   └── package.json       # API dependencies
│   └── web/                   # React frontend
│       ├── src/
│       │   ├── components/    # UI components
│       │   ├── routes/        # Application routes
│       │   └── ...
│       └── package.json       # Frontend dependencies
├── packages/                  # Shared packages
│   ├── ui/                    # Shared UI components
│   └── ...
├── docker-compose.yml         # Docker configuration for PostgreSQL
├── package.json               # Root dependencies and scripts
└── turbo.json                 # Turborepo configuration
```

## API Endpoints

- **Users**
  - `GET /users` - Get all users
  - `GET /users/:id` - Get a user by ID
  - `POST /users` - Create a user
  - `PUT /users/:id` - Update a user
  - `DELETE /users/:id` - Delete a user

- **Items/Products**
  - `GET /items` - Get all items
  - `GET /items/:id` - Get an item by ID
  - `POST /items` - Create an item
  - `PUT /items/:id` - Update an item
  - `DELETE /items/:id` - Delete an item

- **Orders**
  - `GET /orders` - Get all orders
  - `GET /orders/:id` - Get an order by ID
  - `GET /orders/user/:userId` - Get a user's orders
  - `POST /orders` - Create an order
  - `PUT /orders/:id` - Update an order
  - `DELETE /orders/:id` - Delete an order
