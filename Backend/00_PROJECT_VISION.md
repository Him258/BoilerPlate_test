# Project Vision: Kiaan Core Platform

## 1. Product Vision
The Kiaan Core Platform is a highly reusable, scalable, and secure SaaS Boilerplate designed to serve as the foundational architecture for multiple future SaaS products. The vision is to "Build Once, Reuse Everywhere." By consolidating common enterprise features into a single robust core, we can accelerate the development of new SaaS applications (CRM, HRMS, ERPs, etc.) from months down to a few days.

## 2. Purpose
To eliminate repetitive development work by providing a standardized backend platform that handles all common infrastructure and business logic. It provides out-of-the-box support for multi-tenancy, authentication, billing, roles, and notifications.

## 3. Target Users
- **Internal Developers:** To rapidly prototype and launch new B2B/B2C SaaS products.
- **B2B SaaS Customers (Tenants):** Companies that subscribe to the SaaS products built on top of this core.
- **End Users:** The staff, managers, and clients of the tenant companies.

## 4. Dashboard Types
- **Super Admin Dashboard:** For managing the entire platform, all tenants, global billing, global master data, and system-wide audits.
- **Tenant Dashboard (Owner/Admin):** For managing a specific company's settings, branches, users, subscriptions, and module data.
- **Branch/User Dashboard:** For day-to-day operations scoped to a specific user's role and branch permissions.

## 5. User Roles
- **Super Admin:** Master system controller.
- **Owner/Admin:** Tenant-level administrator.
- **Manager:** Branch-level or department-level supervisor.
- **Staff/User:** Standard operational user with restricted, granular permissions.

## 6. Modules
1. **Authentication & Security:** Login, 2FA, JWT, Sessions.
2. **Multi-Tenant Architecture:** Companies, Branches, Data Isolation.
3. **Roles & Permissions:** Dynamic RBAC.
4. **Subscription & Billing:** Stripe/Razorpay, Plans, Invoices, Limits.
5. **User Management:** Departments, Teams, Activity.
6. **Notifications:** Email, SMS, WhatsApp, Push, In-App.
7. **File Management:** Storage, Uploads, Permissions.
8. **Audit & Logs:** Login, API, Errors.
9. **Settings:** General, Email, Payment, Theme.
10. **AI Module:** Models, Prompt Templates, Token Tracking.
11. **CRM Module:** Leads, Pipeline, Tasks.
12. **Communication Module:** Chat, Templates (Email/SMS/WhatsApp).
13. **Reports & Analytics:** Dashboards, Exports.
14. **Master Data Module:** Shared global configuration (Countries, Cities, etc.).
15. **Common Components:** Pagination, Search, Filters.

## 7. Business Goals
- **Speed to Market:** Launch new SaaS products in 3-7 days.
- **Maintainability:** Fix bugs in the core, and all child products benefit.
- **Cost Efficiency:** Shared infrastructure patterns reduce hosting and dev costs.

## 8. Development Philosophy
- **Modular Monolith:** Start as a modular monolith for developer velocity, structured so modules can be extracted into microservices if needed later.
- **Loose Coupling:** Modules should communicate via clear interfaces/events, not deep database joins across bounded contexts.
- **API First:** The backend exists solely to serve well-documented, versioned RESTful APIs.

## 9. Reusability & Scalability Goals
- **Reusability:** Every module must be tenant-agnostic at its core but enforce tenant isolation at the data access layer.
- **Scalability:** Stateless API design, Redis for caching and session management, and BullMQ for asynchronous background tasks (emails, reports, webhooks).
