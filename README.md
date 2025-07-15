# Payment Management API

A RESTful API built with Express.js for managing payments and business revenue tracking.

## Table Structure

The API manages a `payments` table with the following attributes:
- `id` - Primary key (auto-increment)
- `id_user` - User ID (foreign key)
- `chiffre_affaires` - Business turnover/revenue
- `encaisse_payment` - Received payment amount
- `en_attente` - Pending payment amount
- `payment_en_retard` - Late payment amount
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. Create a MySQL database named `payment_db`
2. Run the SQL schema from `database/schema.sql`
3. Configure your database connection in `.env` file

### 3. Environment Configuration
Copy `.env.example` to `.env` and update with your database credentials:
```bash
cp .env.example .env
```

Edit `.env` file:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=payment_db
DB_PORT=3306
PORT=3000
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000/api/payments`

### GET /api/payments
Get all payments
```bash
curl -X GET http://localhost:3000/api/payments
```

### GET /api/payments/:id
Get payment by ID
```bash
curl -X GET http://localhost:3000/api/payments/1
```

### GET /api/payments/user/:userId
Get all payments for a specific user
```bash
curl -X GET http://localhost:3000/api/payments/user/1
```

### POST /api/payments
Create a new payment
```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": 1,
    "chiffre_affaires": 5000.00,
    "encaisse_payment": 3000.00,
    "en_attente": 1500.00,
    "payment_en_retard": 500.00
  }'
```

### PUT /api/payments/:id
Update payment (full update - all fields required)
```bash
curl -X PUT http://localhost:3000/api/payments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "chiffre_affaires": 6000.00,
    "encaisse_payment": 4000.00,
    "en_attente": 1000.00,
    "payment_en_retard": 1000.00
  }'
```

### PATCH /api/payments/:id
Update payment (partial update - only specified fields)
```bash
curl -X PATCH http://localhost:3000/api/payments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "encaisse_payment": 3500.00,
    "en_attente": 1000.00
  }'
```

### DELETE /api/payments/:id
Delete a payment
```bash
curl -X DELETE http://localhost:3000/api/payments/1
```

## Response Format

All API responses follow this format:
```json
{
  "success": true|false,
  "message": "Optional message",
  "data": {} // Response data
}
```

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (validation errors)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

## Features

- ✅ Full CRUD operations for payments
- ✅ User-specific payment queries
- ✅ Partial updates with PATCH
- ✅ Input validation
- ✅ Error handling
- ✅ Request logging
- ✅ Database connection pooling
- ✅ Environment variable configuration
- ✅ Health check endpoint

## Dependencies

- **Express.js** - Web framework
- **MySQL2** - MySQL database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing

## Development Dependencies

- **nodemon** - Auto-restart during development
