# Backend Architecture: Kiaan Core Platform

## 1. Folder Architecture
The backend follows a Modular Monolith architecture pattern to ensure clean separation of concerns while maintaining deployment simplicity.

```text
backend/
├── src/
│   ├── app.js                 # Express app setup & global middleware
│   ├── server.js              # Server entry point
│   ├── config/                # Environment variables, DB config, Redis config
│   ├── core/                  # Core framework utilities (errors, logger, response formatter)
│   ├── middlewares/           # Global middlewares (auth, tenant, rate limiter)
│   ├── modules/               # Domain-driven modules
│   │   ├── auth/              # Auth module (routes, controllers, services)
│   │   ├── tenant/            # Multi-tenant management
│   │   ├── user/              # User & RBAC management
│   │   ├── billing/           # Subscriptions & payments
│   │   └── ...                # Other modules (crm, ai, files)
│   ├── shared/                # Shared utilities, constants, helpers
│   └── workers/               # BullMQ background job processors
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # DB migrations
│   └── seeders/               # Initial data seeding
└── tests/                     # Unit and integration tests
```

## 2. Module Architecture (Layered Design)
Each module inside `src/modules/` follows a strict 3-tier architecture:
- **Routes Layer (`module.routes.js`):** Defines HTTP endpoints, attaches middlewares (Auth, Validator).
- **Controller Layer (`module.controller.js`):** Extracts request data, calls the Service, and formats the HTTP response.
- **Service Layer (`module.service.js`):** Contains pure business logic. Handles transactions and throws standard application errors.

*(Data access logic will be handled directly via Prisma within the Service layer, avoiding a heavy Repository pattern to keep development fast, but keeping all DB calls abstracted from the Controller).*

## 3. Request Flow
`Client Request` -> `Helmet/CORS` -> `Rate Limiter` -> `Route Definition` -> `Auth Middleware` -> `Tenant Middleware` -> `Zod Validator Middleware` -> `Controller` -> `Service` -> `Prisma DB` -> `Controller` -> `Success/Error Response Formatter` -> `Client`

## 4. Authentication Flow
- **Strategy:** JWT (JSON Web Tokens) with short-lived Access Tokens and long-lived Refresh Tokens.
- **Storage:** Refresh tokens stored in HTTP-Only cookies or Redis for easy revocation.
- **Login:** Returns Access Token (body) and sets Refresh Token (cookie).
- **2FA:** If enabled, Login returns a temporary token to complete TOTP verification before issuing standard tokens.

## 5. Authorization & RBAC Flow
- **Dynamic RBAC:** Permissions are mapped to Roles in the database.
- **Middleware:** `requirePermission('module:action')` middleware checks if the user's role contains the required permission string.
- User roles can be standard (Admin, Manager) or completely custom-built by the Tenant Owner.

## 6. Tenant & Branch Isolation
- **Row-Level Isolation:** Every table belonging to a tenant has a `tenantId`.
- **Middleware Extraction:** A global `tenantMiddleware` extracts `tenantId` from the authenticated user's JWT or a custom `X-Tenant-ID` header (for Super Admins impersonating tenants).
- **Service Enforcement:** Services must ALWAYS include `where: { tenantId: req.tenantId }` in Prisma queries. No exceptions.
- **Branches:** For tables that belong to branches, `branchId` is also enforced based on user scope.

## 7. Middleware Flow
- **Auth Middleware:** Verifies JWT and injects `req.user`.
- **Tenant Middleware:** Injects `req.tenantId` and verifies user belongs to this tenant.
- **Validator Middleware:** Uses `Zod` schemas to validate `req.body`, `req.query`, and `req.params`. Automatically returns 400 Bad Request if validation fails.

## 8. Validation Flow
- All API inputs are strictly validated using `Zod`.
- Schemas are defined in `module.schema.js`.
- Protects against NoSQL/SQL injection and unexpected payload shapes.

## 9. Error Handling
- **Custom Error Classes:** `AppError` (base), `NotFoundError`, `ValidationError`, `UnauthorizedError`, `ForbiddenError`.
- **Global Error Handler:** Catches all thrown errors, logs them, and formats a consistent JSON response avoiding stack trace leaks in production.

## 10. File Upload Flow
- **Multer:** Handles multipart/form-data.
- **Storage Strategy:** Uploads are streamed directly to Cloud Storage (AWS S3, Cloudinary, or ImageKit) to avoid clogging the Node.js server.
- Database stores only the resulting URL and file metadata (size, mimetype, tenantId).

## 11. Notification Flow
- Event-driven. When a Service triggers an action (e.g., `User Created`), it fires an event.
- The Notification Service listens to these events, determines user preferences (Email, SMS, WhatsApp), and pushes a job to the Queue.

## 12. Queue Flow (BullMQ & Redis)
- **Use Cases:** Email sending, Report generation, Bulk imports/exports, Webhooks.
- **Architecture:** Express API adds jobs to Redis queues. Separate Worker processes (or async functions running in the background) consume the queue.

## 13. Logging Strategy
- **HTTP Logging:** `morgan` for all incoming requests.
- **Application Logging:** `Winston` or `Pino` for structured JSON logging.
- **Audit Logs:** Specific business actions (e.g., "Deleted User", "Changed API Key") are saved to the `AuditLog` database table for UI display.

## 14. Cache Strategy
- **Redis:** Used for caching frequently accessed, rarely changed data (e.g., Master Data like Countries/States, Role Permissions).
- Cache invalidation occurs on entity update.
