# AI-Driven Learning Platform

A full-stack mini MVP that allows users to select a category and sub-category, send prompts to an AI, receive generated lessons, and view their learning history.

---

## Technologies Used

**Backend:**
- Node.js + Express 5
- PostgreSQL + Prisma 7 ORM
- OpenAI API (GPT-4o-mini)
- JWT Authentication
- Swagger / OpenAPI documentation
- Docker (for local PostgreSQL)

**Frontend:**
- React + TypeScript
- Vite

---

## Project Structure

```
AI-learning-platform/
├── backend/
│   ├── config/         # Swagger configuration
│   ├── controllers/    # Route handlers
│   ├── lib/            # Shared Prisma client
│   ├── middleware/     # Error handling, validation, auth
│   ├── prisma/         # Schema, migrations, seed
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── index.js        # Server entry point
└── frontend/
    └── src/
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Docker Desktop

### 1. Clone the repository

```bash
git clone https://github.com/a0556776149-del/AI-learning-platform.git
cd AI-learning-platform
```

### 2. Set up environment variables

```bash
cd backend
cp .env.example .env
```

Fill in your values in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key from [platform.openai.com](https://platform.openai.com)
- `ADMIN_PASSWORD` - Password for the admin dashboard
- `JWT_SECRET` - Secret key for JWT tokens

### 3. Start the database (Docker)

```bash
docker-compose up -d
```

### 4. Install dependencies and run migrations

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

### 5. Seed the database

```bash
npm run seed
```

### 6. Start the backend

```bash
npm run dev
```

Backend runs on: `http://localhost:3000`

API docs (Swagger): `http://localhost:3000/api-docs`

### 7. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /users | Register a new user |
| POST | /users/login | Login with phone number |
| GET | /users/:id | Get user by ID |
| GET | /categories | Get all categories |
| GET | /categories/:id/subcategories | Get subcategories |
| POST | /prompts | Send prompt to AI |
| GET | /prompts/user/:userId | Get user prompt history |
| POST | /admin/login | Admin login (returns JWT) |
| GET | /admin/users | Get all users (admin only) |
| GET | /admin/users/:id/prompts | Get user prompts (admin only) |

---

## Available Categories

| Category | Sub-categories |
|----------|----------------|
| Science | Space, Biology, Physics |
| History | World War II, Ancient Egypt, The Renaissance |
| Technology | Artificial Intelligence, Web Development, Cybersecurity |
| Programming Languages | Python, JavaScript, Java, C++, TypeScript, Go, Rust, SQL |
| Languages | English, Spanish, French, Hebrew, Arabic, German, Italian, Japanese |
| Mathematics | Algebra, Geometry, Statistics, Calculus |

---

## Assumptions

- One admin exists, identified by a secret password stored in `.env`
- Users are identified by phone number (unique)
- Returning users can login with their phone number
- AI responses are generated using OpenAI GPT-4o-mini
- AI prompt includes category and sub-category context for focused lessons

---

## Bonus Features

- JWT-based admin authentication
- Swagger / OpenAPI documentation
- TypeScript in frontend
- User login (returning users)
- Dark modern UI with glassmorphism design
