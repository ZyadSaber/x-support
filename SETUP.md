# JWT Authentication Setup

This project now includes a complete JWT authentication system with user_name and password authentication using Prisma database and Axios for API calls.

## Features

- ✅ User registration with user_name, password, and name
- ✅ User login with user_name and password
- ✅ JWT token-based authentication
- ✅ HTTP-only cookies for secure token storage
- ✅ Password hashing with bcrypt
- ✅ Custom hook to get user data from auth cookie
- ✅ Protected routes and user state management
- ✅ Logout functionality
- ✅ Axios for API calls with interceptors and better error handling

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 2. Database Setup

1. Make sure you have PostgreSQL installed and running
2. Create a database for your project
3. Update the `DATABASE_URL` in your `.env` file
4. Run the database migration:

```bash
npx prisma db push
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Start the Development Server

```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user data

## Usage

### Registration

Send a POST request to `/api/auth/register` with:

```json
{
  "user_name": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login

Send a POST request to `/api/auth/login` with:

```json
{
  "user_name": "user@example.com",
  "password": "password123"
}
```

### Using the useAuth Hook

```tsx
import useAuth from "@/components/auth/hooks/useAuth";

const MyComponent = () => {
  const { user, isLoading, error, refetch } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Please log in</div>;

  return <div>Welcome, {user.name}!</div>;
};
```

### Using Axios API Instance

```tsx
import api from "@/lib/axios";

// Make API calls
const login = async (user_name: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { user_name, password });
    return response.data;
  } catch (error) {
    // Error handling is automatic with axios interceptors
    throw error;
  }
};
```

## Axios Configuration

The project uses a configured Axios instance (`src/lib/axios.ts`) with:

- Base URL set to `/api`
- Automatic JSON content-type headers
- `withCredentials: true` for cookie handling
- Request and response interceptors
- Automatic error handling for 401 responses

## Security Features

- Passwords are hashed using bcrypt with 12 salt rounds
- JWT tokens are stored in HTTP-only cookies
- Tokens expire after 7 days
- Secure cookie settings for production
- Input validation on all endpoints
- Axios interceptors for centralized error handling

## Database Schema

The User model includes:

- `id` (auto-increment primary key)
- `user_name` (unique)
- `password` (hashed)
- `name`
- `createdAt`
- `updatedAt`
