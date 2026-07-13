# Development Roadmap: Kiaan Core Platform

This roadmap breaks down the backend development into logical, sequential phases.

## Phase 1: Project Setup & Core Infrastructure
**Objectives:** Establish the repository, base structure, DB connection, and global utilities.
- Initialize Express, Prisma, and MySQL.
- Setup Helmet, CORS, Morgan, Error Handler Middleware.
- Define custom Error Classes.
- Setup standard Response Formatter.
- **Dependencies:** None.

## Phase 2: Database Schema (Prisma)
**Objectives:** Translate `02_DATABASE_DESIGN.md` into actual `schema.prisma`.
- Write models for Tenant, User, Role, Permissions.
- Run migrations.
- Create initial Seeders (Super Admin user, Default Permissions).

## Phase 3: Authentication Module
**Objectives:** Secure access to the API.
- Implement Login, Register, Forgot Password.
- Implement JWT generation and verification.
- Implement `AuthMiddleware`.
- **Expected APIs:** `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset`.

## Phase 4: Tenant & Branch Isolation
**Objectives:** Ensure data privacy across companies.
- Implement `TenantMiddleware` (extracts tenant ID from JWT).
- Create Tenant Management APIs (for Super Admin).
- Create Branch Management APIs (for Tenant Admin).
- **Expected APIs:** `/tenants`, `/tenants/:id/branches`.

## Phase 5: RBAC (Roles & Permissions)
**Objectives:** Granular access control.
- Implement `requirePermission` middleware.
- APIs to create custom Roles and assign Permissions.
- **Expected APIs:** `/roles`, `/roles/:id/permissions`, `/permissions`.

## Phase 6: User Management
**Objectives:** Staff management within tenants.
- APIs for CRUD on Users.
- Map Users to Roles and Branches.
- Implement User Profile endpoints.
- **Expected APIs:** `/users`, `/users/profile`, `/users/:id/reset-password`.

## Phase 7: Master Data Module
**Objectives:** Global data lookups.
- Setup Seeders for Countries, States, Cities.
- Expose read-only APIs.
- Set up Redis caching for these endpoints.
- **Expected APIs:** `/master/countries`, `/master/categories`.

## Phase 8: File Management Module
**Objectives:** Asset storage.
- Integrate AWS S3 or Cloudinary.
- Implement Multer middleware.
- **Expected APIs:** `/files/upload`, `/files`, `/files/:id`.

## Phase 9: Billing & Subscription Module
**Objectives:** Monetization logic.
- Integrate Stripe/Razorpay SDK.
- Webhook handlers for subscription updates.
- **Expected APIs:** `/billing/plans`, `/billing/subscribe`, `/billing/webhooks`.

## Phase 10: CRM & Operational Modules
**Objectives:** Build the specific business logic for modules like CRM.
- Implement Leads, Pipeline, Tasks.
- **Expected APIs:** `/crm/leads`, `/crm/tasks`.

## Phase 11: AI & Communication Modules
**Objectives:** Value-added features.
- Build APIs to manage Prompt Templates, SMS Templates.
- Implement background queue for sending emails/SMS using BullMQ.
- **Expected APIs:** `/ai/templates`, `/communication/sms`.

## Phase 12: Audit & Reports
**Objectives:** System visibility.
- Intercept events and write to `AuditLog`.
- Build aggregated queries for Dashboard analytics.
- **Expected APIs:** `/audit/logs`, `/reports/dashboard-stats`.

---
*Testing Checklists: Every phase must include Jest unit tests for Services and Supertest integration tests for Routes before moving to the next phase.*
