# Database Design & Planning: Kiaan Core Platform

## 1. Primary Strategy
- **ORM:** Prisma
- **Database Engine:** MySQL
- **Primary Keys:** `UUID` (v4) for all tables to prevent ID guessing and support easy data migrations. Auto-increment integers are avoided for security.
- **Tenant Isolation:** A strict `tenantId` foreign key on every client-specific table.
- **Audit Trails:** Every table will include `createdAt` and `updatedAt`. Major operational tables will include `createdBy` and `updatedBy`.
- **Soft Deletes:** Use `deletedAt` (DateTime | null) instead of permanently deleting records. Prisma queries will filter out `deletedAt: { not: null }`.

## 2. Core Tables
- **Tenant:** Represents a company. Fields: `id`, `name`, `domain`, `status`, `subscriptionId`.
- **Branch:** Represent physical or logical divisions. Fields: `id`, `tenantId`, `name`, `address`.
- **User:** Represent staff/clients. Fields: `id`, `tenantId`, `email`, `passwordHash`, `firstName`, `lastName`, `phone`, `roleId`, `departmentId`, `is2FAEnabled`.
- **Role:** Fields: `id`, `tenantId`, `name`, `description`, `isSystem` (prevents deletion of default roles).
- **Permission:** Global list of permissions (e.g., `create:users`). Fields: `id`, `resource`, `action`.
- **RolePermission:** Many-to-Many join table mapping Roles to Permissions.

## 3. Subscription & Billing Tables
- **Plan:** Global plans. Fields: `id`, `name`, `price`, `interval`, `features` (JSON).
- **Subscription:** Fields: `id`, `tenantId`, `planId`, `status`, `currentPeriodEnd`.
- **Invoice:** Fields: `id`, `tenantId`, `amount`, `status`, `pdfUrl`, `dueDate`.
- **Coupon:** Global. Fields: `id`, `code`, `discountPercent`, `validUntil`.

## 4. Operational Modules Tables
- **File:** `id`, `tenantId`, `name`, `url`, `mimetype`, `size`, `folderId`.
- **Notification:** `id`, `tenantId`, `userId`, `type`, `title`, `body`, `isRead`.
- **AuditLog:** `id`, `tenantId`, `userId`, `action`, `resource`, `ipAddress`, `details` (JSON).
- **AISetting:** `id`, `tenantId`, `provider`, `apiKey` (encrypted).
- **AITemplate:** `id`, `tenantId`, `name`, `model`, `prompt`.
- **CommunicationTemplate:** `id`, `tenantId`, `type` (EMAIL, SMS, WHATSAPP), `name`, `body`, `metaStatus`.

## 5. CRM Module Tables
- **Lead:** `id`, `tenantId`, `name`, `email`, `phone`, `source`, `statusId`, `assignedTo`.
- **Task:** `id`, `tenantId`, `title`, `description`, `dueDate`, `status`, `leadId`.

## 6. Master Data Tables (Global, No tenantId)
- **Country**, **State**, **City**: Standard hierarchical location data.
- **Category**, **Tag**, **Unit**, **Tax**: Standard lookup tables. Note: These might need `tenantId` if tenants can create custom tags/taxes.

## 7. Relationships
- **One-to-One:** User -> Profile.
- **One-to-Many:** Tenant -> Users, Tenant -> Branches, Role -> Users, Lead -> Tasks.
- **Many-to-Many:** Users <-> Teams (via `UserTeam` table), Roles <-> Permissions (via `RolePermission`).

## 8. Indexing Strategy
- **Foreign Keys:** Create indexes on all FK columns (`tenantId`, `roleId`, `branchId`).
- **Composite Indexes:** Indexes on `(tenantId, email)` for Users, `(tenantId, status)` for Leads to optimize multi-tenant query performance.
- **Searchable Fields:** Index `email`, `name`, `phone` where frequent text searches occur.
