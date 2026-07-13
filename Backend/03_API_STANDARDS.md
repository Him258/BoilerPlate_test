# API Development Standards

## 1. REST Standards & Versioning
- All endpoints must be prefixed with API version: `/api/v1/`
- Resources should be plural nouns: `/api/v1/users`, `/api/v1/companies`
- Use correct HTTP Methods:
  - `GET`: Retrieve resource(s)
  - `POST`: Create a new resource
  - `PUT`: Fully replace a resource
  - `PATCH`: Partially update a resource
  - `DELETE`: Soft delete a resource

## 2. Standardized Response Format
Every API response (success) must strictly follow this envelope structure:
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": { ... },
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalRecords": 45,
      "totalPages": 5
    }
  }
}
```

## 3. Standardized Error Format
Errors must return the correct HTTP status code and this JSON payload:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "message": "Must be a valid email" }
    ]
  }
}
```

## 4. HTTP Status Codes
- `200 OK`: Successful GET, PUT, PATCH.
- `201 Created`: Successful POST.
- `204 No Content`: Successful DELETE (Optional, or return 200 with message).
- `400 Bad Request`: Validation errors, bad inputs.
- `401 Unauthorized`: Missing or invalid JWT.
- `403 Forbidden`: Valid JWT, but lacks Role/Permission.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unhandled exceptions.

## 5. Pagination, Search, and Sorting
Standardized Query Parameters for list endpoints:
- `?page=1&limit=20`: Pagination
- `?search=john`: Full-text or partial search
- `?sortBy=createdAt&sortOrder=desc`: Sorting
- `?status=ACTIVE`: Exact match filtering

## 6. Authentication & Authorization
- Requests must include headers: `Authorization: Bearer <token>`.
- Internal validation checks token signature and expiration.
- Endpoints must be protected by RBAC middleware: `router.delete('/:id', auth, checkPermission('delete:users'), controller.deleteUser)`

## 7. Validation Strategy
- Use Zod schemas in middleware.
- Example: `validate(createUserSchema)`
- The controller should never have to check if `req.body.email` exists; the middleware guarantees it.

## 8. Security & Rate Limiting
- Use `helmet` for HTTP headers.
- Global Rate Limiter: Maximum 100 requests per minute per IP.
- Strict Rate Limiter: Maximum 5 requests per minute for sensitive endpoints (Login, Forgot Password, OTP).
