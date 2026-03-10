# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students can attempt pre-configured SQL assignments, inspect sample schema/data, execute queries in real time, and receive AI-generated hints without being shown the full solution.

## Features

- Assignment listing page
- Assignment attempt page
- Question and requirements panel
- Sample schema and sample data viewer
- SQL query execution against PostgreSQL
- Query result table
- Query validation for safer execution
- AI hint generation
- Responsive frontend using React + SCSS

## Tech Stack

### Frontend
- React
- React Router
- SCSS
- Axios
- Monaco Editor

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- PostgreSQL with pg
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
