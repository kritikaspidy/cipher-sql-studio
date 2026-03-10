# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where users can practice SQL queries on predefined assignments.

Users can:
- view SQL assignment questions
- inspect table schemas and sample data
- write SQL queries in a browser editor
- execute queries against PostgreSQL
- receive AI-generated hints without revealing the full solution

## Tech Stack

### Frontend
- React
- SCSS
- Monaco Editor

### Backend
- Node.js
- Express.js

### Database
- MongoDB (assignment data)
- PostgreSQL (SQL sandbox)

### AI
- Grok API for hints

## Why these technologies were chosen

- **React**: component-based UI, good for building a multi-panel interactive interface
- **SCSS**: required by the assignment and useful for modular styling with variables and mixins
- **Express.js**: simple and fast for building REST APIs
- **MongoDB**: stores assignment metadata such as title, question, requirements, and relevant tables
- **PostgreSQL**: stores structured relational sample data and is the actual SQL execution sandbox
- **Monaco Editor**: provides a better SQL writing experience than a plain textarea
- **Grok API**: used to generate hints without directly revealing final answers

## Project Structure

```text
cipher-sql-studio/
  backend/
    src/
      config/
      controllers/
      models/
      routes/
    .env.example
    package.json
  frontend/
    cipher-sql/
      src/
        api/
        components/
        pages/
        styles/
    .env.example
    package.json
  README.md
```

## Environmental Variables
### Backend (.env)
```text
PORT=8000
MONGODB_URI=
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=
PG_DATABASE=ciphersqlstudio
GROK_API_KEY=
```

## Installation steps

### clone the repository
```text
git clone https://github.com/yourusername/cipher-sql-studio.git
cd cipher-sql-studio
```

### Setup Backend
```text
cd backend
npm install
```
create .env file
#### start server
```text
npm run dev
```

### Setup Frontend
```text
cd frontend/cipher-sql
npm install
npm run dev
```
### Database Setup
create database named
```text
ciphersqlstudio
```

```text
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    city VARCHAR(100)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    price INTEGER
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER
);
```

## API Endpoints

### Assignments
```text
GET /api/assignments
GET /api/assignments/:id
GET /api/assignments/:id/schema
```

### Query Execution
```text
POST /api/query/execute
```

### Hint Generation
```text
POST /api/hint
```

## Data Flow Expansion

### Query Execution Flow 
- User writes SQL query in the editor.
- React stores the query in component state.
- User clicks Execute Query.
- Frontend sends POST /api/query/execute.
- Backend validates the SQL query.
- Backend executes the query on PostgreSQL.
- PostgreSQL returns rows.
- Backend sends the response to frontend.
- React updates state and displays results in the results table.

### Hint Generation Flow
- User clicks Get Hint.
- Frontend sends POST /api/hint with assignmentId and query.
- Backend fetches assignment details from MongoDB.
- Backend constructs a prompt for the AI model.
- Backend calls the Grok API.
- AI generates a hint.
- Hint is returned to frontend and displayed to the user.

