-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2026 at 08:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boiler-plate`
--

-- --------------------------------------------------------

--
-- Table structure for table `ailog`
--

CREATE TABLE `ailog` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `time` varchar(191) NOT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `promptSnippet` text DEFAULT NULL,
  `tokensUsed` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiprovider`
--

CREATE TABLE `aiprovider` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `provider` varchar(191) NOT NULL,
  `model` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `requests` varchar(191) DEFAULT NULL,
  `tokens` varchar(191) DEFAULT NULL,
  `avgLatency` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aitemplate`
--

CREATE TABLE `aitemplate` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `templateName` varchar(191) NOT NULL,
  `model` varchar(191) DEFAULT NULL,
  `promptSnippet` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `apikey`
--

CREATE TABLE `apikey` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `keyName` varchar(191) NOT NULL,
  `prefix` varchar(191) DEFAULT NULL,
  `environment` varchar(191) DEFAULT NULL,
  `permissions` varchar(191) DEFAULT NULL,
  `lastUsed` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auditlog`
--

CREATE TABLE `auditlog` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `eventId` varchar(191) DEFAULT NULL,
  `action` varchar(191) DEFAULT NULL,
  `actor` varchar(191) DEFAULT NULL,
  `resource` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `timestamp` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auditlog`
--

INSERT INTO `auditlog` (`id`, `tenantId`, `eventId`, `action`, `actor`, `resource`, `ipAddress`, `timestamp`, `createdAt`) VALUES
('5692c4f1-dfd9-44dc-8c55-126e5cee01f7', '1dd328f0-f42a-4738-9b03-8e27a5434a93', NULL, 'INSERT', 'ak@gmail.com', 'Project: f05a93f3-eca7-4c89-a060-8b5f6e5b626f, Table: cars, Record ID: a1af057c-d092-46bd-b04a-f68c310aeee0', '127.0.0.1', '2026-07-14T07:05:56.085Z', '2026-07-14 07:05:56.090'),
('a59340be-2f8a-44e4-a795-566c3e7b33e5', '1dd328f0-f42a-4738-9b03-8e27a5434a93', NULL, 'INSERT', 'ak@gmail.com', 'Project: f05a93f3-eca7-4c89-a060-8b5f6e5b626f, Table: cars, Record ID: 3cd2ef57-d11c-4b5c-a40b-4668d35ae535', '127.0.0.1', '2026-07-14T06:55:57.075Z', '2026-07-14 06:55:57.077');

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `provider` varchar(191) NOT NULL,
  `clientId` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `usersConfigured` varchar(191) DEFAULT NULL,
  `lastSynced` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `automation`
--

CREATE TABLE `automation` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `ruleName` varchar(191) NOT NULL,
  `eventTrigger` varchar(191) DEFAULT NULL,
  `action` varchar(191) DEFAULT NULL,
  `target` varchar(191) DEFAULT NULL,
  `executions` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `branchName` varchar(191) NOT NULL,
  `organization` varchar(191) DEFAULT NULL,
  `manager` varchar(191) DEFAULT NULL,
  `employees` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `tenantId`, `branchName`, `organization`, `manager`, `employees`, `city`, `status`, `createdAt`, `updatedAt`) VALUES
('a6b41090-ee4a-4879-afe5-5e13ae1755f6', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'IT', 'kia', 'mee', 'emp', 'indore', 'Active', '2026-07-14 08:56:46.720', '2026-07-14 08:56:46.720');

-- --------------------------------------------------------

--
-- Table structure for table `branding`
--

CREATE TABLE `branding` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `tenantName` varchar(191) DEFAULT NULL,
  `primaryColor` varchar(191) DEFAULT NULL,
  `logoUrl` varchar(191) DEFAULT NULL,
  `font` varchar(191) DEFAULT NULL,
  `customCss` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `channelName` varchar(191) NOT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `apiKeyStatus` varchar(191) DEFAULT NULL,
  `deliveryRate` varchar(191) DEFAULT NULL,
  `lastUsed` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `discount` varchar(191) DEFAULT NULL,
  `duration` varchar(191) DEFAULT NULL,
  `redemptions` varchar(191) DEFAULT NULL,
  `maxUses` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `departmentName` varchar(191) NOT NULL,
  `organization` varchar(191) DEFAULT NULL,
  `headOfDepartment` varchar(191) DEFAULT NULL,
  `employees` varchar(191) DEFAULT NULL,
  `budget` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `tenantId`, `departmentName`, `organization`, `headOfDepartment`, `employees`, `budget`, `status`, `createdAt`, `updatedAt`) VALUES
('a5abb935-fa91-4b2c-b052-574d5779ca44', '7a5ea345-376d-463a-b458-12648cb60e20', 'ea61a329-585f-4d9c-bf19-0e17d183751a', NULL, NULL, NULL, NULL, 'Active', '2026-07-14 08:58:00.917', '2026-07-14 08:58:00.917'),
('ea61a329-585f-4d9c-bf19-0e17d183751a', '7a5ea345-376d-463a-b458-12648cb60e20', 'sales', 'Kiaan Core HQ', 'hod', '3', '10000', 'Active', '2026-07-14 08:57:23.092', '2026-07-14 08:57:23.092');

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `deviceName` varchar(191) NOT NULL,
  `owner` varchar(191) DEFAULT NULL,
  `browser` varchar(191) DEFAULT NULL,
  `operatingSystem` varchar(191) DEFAULT NULL,
  `ip` varchar(191) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `lastLogin` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emailtemplate`
--

CREATE TABLE `emailtemplate` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `templateName` varchar(191) NOT NULL,
  `subjectLine` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feature`
--

CREATE TABLE `feature` (
  `id` varchar(191) NOT NULL,
  `featureName` varchar(191) NOT NULL,
  `key` varchar(191) DEFAULT NULL,
  `availableIn` varchar(191) DEFAULT NULL,
  `usageLimit` varchar(191) DEFAULT NULL,
  `createdBy` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `fileName` varchar(191) NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `size` varchar(191) DEFAULT NULL,
  `uploadedBy` varchar(191) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `invoiceNo` varchar(191) DEFAULT NULL,
  `tenantName` varchar(191) DEFAULT NULL,
  `amount` varchar(191) DEFAULT NULL,
  `dateIssued` varchar(191) DEFAULT NULL,
  `dueDate` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledgebase`
--

CREATE TABLE `knowledgebase` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `documentName` varchar(191) NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `tokens` varchar(191) DEFAULT NULL,
  `chunks` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loginlog`
--

CREATE TABLE `loginlog` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `user` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `country` varchar(191) DEFAULT NULL,
  `browser` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `date` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificationlog`
--

CREATE TABLE `notificationlog` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `recipient` varchar(191) DEFAULT NULL,
  `channel` varchar(191) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `sentAt` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` varchar(191) NOT NULL,
  `module` varchar(191) DEFAULT NULL,
  `canView` varchar(191) DEFAULT NULL,
  `canCreate` varchar(191) DEFAULT NULL,
  `canUpdate` varchar(191) DEFAULT NULL,
  `canDelete` varchar(191) DEFAULT NULL,
  `canImport` varchar(191) DEFAULT NULL,
  `canExport` varchar(191) DEFAULT NULL,
  `canApprove` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `action` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `resource` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `module`, `canView`, `canCreate`, `canUpdate`, `canDelete`, `canImport`, `canExport`, `canApprove`, `createdAt`, `updatedAt`, `action`, `name`, `resource`) VALUES
('0d3560c1-d9aa-460a-8e32-268aed052d0f', 'roles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.717', '2026-07-13 10:41:18.717', 'manage', NULL, 'roles'),
('1fb659f6-4a38-445a-b6d8-c65171e89840', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.701', '2026-07-13 10:41:18.701', 'delete', NULL, 'storage'),
('1fd250b8-235a-43f9-919a-1d040ca682cb', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.671', '2026-07-13 10:41:18.671', 'read', NULL, 'database'),
('25891aeb-fef7-46da-a5bc-5cb2992525b2', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.614', '2026-07-13 10:41:18.614', '*', NULL, 'storage'),
('26e0a9d4-397f-493c-ac1a-45f719fc9edd', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.648', '2026-07-13 10:41:18.648', 'write', NULL, 'database'),
('2adb8ff2-668f-43e7-8438-f3341dda0aae', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.659', '2026-07-13 10:41:18.659', 'write', NULL, 'storage'),
('3ec6a66e-080b-490b-a338-a81530f91068', 'project', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.723', '2026-07-13 10:41:18.723', 'settings', NULL, 'project'),
('40a7622c-6e34-4225-b24b-854a84dabdbc', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.677', '2026-07-13 10:41:18.677', 'update', NULL, 'database'),
('500f2c85-d904-43ac-900d-88902b0dad06', 'users', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.630', '2026-07-13 10:41:18.630', '*', NULL, 'users'),
('5baa5c8c-9143-4599-8cf5-c5034bac977e', 'users', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.706', '2026-07-13 10:41:18.706', 'manage', NULL, 'users'),
('7417ff69-ab0b-4c9e-a2b0-58ee13cff703', 'roles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.636', '2026-07-13 10:41:18.636', '*', NULL, 'roles'),
('77d44eb3-63f3-4d37-9724-cab0befbd4dc', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.665', '2026-07-13 10:41:18.665', 'create', NULL, 'database'),
('83a5c1f2-660f-4a86-880f-4a4faf7ef45f', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.654', '2026-07-13 10:41:18.654', 'read', NULL, 'storage'),
('8476d57b-6204-4991-9661-bc20d1995fc1', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.683', '2026-07-13 10:41:18.683', 'delete', NULL, 'database'),
('852a30f7-4228-49ee-876f-39dadef884f1', 'database', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.595', '2026-07-13 10:41:18.595', '*', NULL, 'database'),
('97bae0f3-89f6-4374-9e98-3b3a6e50a73a', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.695', '2026-07-13 10:41:18.695', 'download', NULL, 'storage'),
('b069c792-9aef-4b57-b273-3d517db471b3', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.690', '2026-07-13 10:41:18.690', 'upload', NULL, 'storage'),
('c176a6d5-9439-48bd-b81e-645faea32ef8', 'Dashboard', '✔️', '❌', '❌', '❌', '❌', '❌', '❌', '2026-07-14 07:48:43.424', '2026-07-14 07:48:43.424', NULL, NULL, NULL),
('fe6d1cb2-b259-4900-88ce-2ad8a95a4d50', 'project', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-13 10:41:18.642', '2026-07-13 10:41:18.642', '*', NULL, 'project');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` varchar(191) NOT NULL,
  `planName` varchar(191) NOT NULL,
  `priceMonthly` varchar(191) DEFAULT NULL,
  `priceAnnual` varchar(191) DEFAULT NULL,
  `subscribers` varchar(191) DEFAULT NULL,
  `featuresLimit` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `refId` varchar(191) NOT NULL,
  `dbHost` varchar(191) NOT NULL,
  `dbPort` int(11) NOT NULL DEFAULT 3306,
  `dbName` varchar(191) NOT NULL,
  `dbUsername` varchar(191) NOT NULL,
  `dbPasswordEncrypted` text NOT NULL,
  `jwtSecretEncrypted` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'provisioning',
  `jwtExpiresIn` int(11) NOT NULL DEFAULT 3600,
  `jwtRefreshExpiresIn` int(11) NOT NULL DEFAULT 604800,
  `jwtIssuer` varchar(191) NOT NULL DEFAULT 'kiaan-auth',
  `jwtAudience` varchar(191) NOT NULL DEFAULT 'kiaan-users',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `tenantId`, `name`, `refId`, `dbHost`, `dbPort`, `dbName`, `dbUsername`, `dbPasswordEncrypted`, `jwtSecretEncrypted`, `status`, `jwtExpiresIn`, `jwtRefreshExpiresIn`, `jwtIssuer`, `jwtAudience`, `createdAt`, `updatedAt`) VALUES
('005c3f6a-5f88-4f9c-9d87-aff5c892e743', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'car', 'car-d1a2d37e', 'localhost', 3306, 'proj_car_d1a2d37e', 'user_car_d1a2d37e', '8e09f9c1d114bb7e6539f35b:7843f48c4908cd6b162820967274fe43:0aa3cdfd96699fe05f765ae42ae74789ceacdfa2f19846c2bfc1136f6dbd339c', '31043f02ff4d0bb6635686ff:efec388cf9c6fbe0aafc2988f51ba6c7:5d3dd25847dc8d53e809790e34836d1d7dbb5f5bf97ad7d95e4abbf8372d2601c511d9f1acd7bc31664add35f87ceb036a2d61fdd203bb5d939eb3fd2548a67a', 'active', 3600, 604800, 'kiaan-auth', 'kiaan-users', '2026-07-14 07:17:54.994', '2026-07-14 07:17:55.852'),
('3e214022-ee2f-4c0a-b2a9-b3f111bbef51', '4c9efe9a-84ea-4fbe-a58c-ef63ddbf0b72', 'carrsss', 'carrsss-b6e62ad3', 'localhost', 3306, 'proj_carrsss_b6e62ad3', 'user_carrsss_b6e62ad3', 'd4a8a2063b825f036098bb56:96ebcf6fbe899bf174c6c9d1d3f1961e:df76d960dc7f69167fe0e712ce0dbde956e341621ee152110da5f5589f233c4b', 'b8ba8c3dac309ae04d09aa11:8c14dec6edd3e70ffb8749fee7c0d6a3:4f057b7018e6ed1ff5b4c75e213e38fe60ffca0629a2da86bccf0dd9c70b085e0ad7feeae00dc2c0966722980bd90c1ba7e6fb6d8816a8788b3791efb2c352a0', 'active', 3600, 604800, 'kiaan-auth', 'kiaan-users', '2026-07-14 09:15:27.919', '2026-07-14 09:15:28.594'),
('8381555b-ce49-4ef9-b856-3ca75fd3596c', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'new', 'new-b0ab30fb', 'localhost', 3306, 'proj_new_b0ab30fb', 'user_new_b0ab30fb', '4683d716ae9630ae29924719:4c1afef5709922b551d743be3aac5a23:4176b61f3af129f4c7cac1591d88711d70774a3dba7d71726a87184009e4f009', '495277def646a9065494d816:dca8f6ec5220e1e0ea3e6155979536c9:ad37d62bdf4579c1da702a706ba012db83ad15e7d3b7018fb9f81ec13d32c5fd231757ba6e023a8b21a96cd5ae3aa2892004b2addcd0b551b94cb240d4882f05', 'active', 3600, 604800, 'kiaan-auth', 'kiaan-users', '2026-07-14 05:34:04.381', '2026-07-14 05:34:05.172'),
('f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '1dd328f0-f42a-4738-9b03-8e27a5434a93', 'pro', 'pro-d5835bd5', 'localhost', 3306, 'proj_pro_d5835bd5', 'user_pro_d5835bd5', '9c9eb79d7c7801f294c402b2:0cf7f2d1c4387d549dab3055a1547327:8a498c9b46dfe787e5a875097bd399993e064d11358b899484629f8bc09b749f', '645e0b51f920a71d98e759e9:518ca276383ae20d79729128052d3908:8dd582a6af94eeded7e569f496bcf4d304c5ffa3532ddfc5f202c54551f1fbfc3b3f0a7ced9f2f8a75e26258dc77d5b9a77a6750a4110ced37f8396c67d9f9d7', 'active', 3600, 604800, 'kiaan-auth', 'kiaan-users', '2026-07-13 10:41:18.526', '2026-07-13 10:41:19.188');

-- --------------------------------------------------------

--
-- Table structure for table `projectapikey`
--

CREATE TABLE `projectapikey` (
  `id` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `keyType` varchar(191) NOT NULL,
  `keyToken` varchar(700) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projectapikey`
--

INSERT INTO `projectapikey` (`id`, `projectId`, `name`, `keyType`, `keyToken`, `createdAt`) VALUES
('16edb44f-823d-4b17-9471-1b87c230a345', '005c3f6a-5f88-4f9c-9d87-aff5c892e743', 'anon', 'anon', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsInByb2plY3RJZCI6IjAwNWMzZjZhLTVmODgtNGY5Yy05ZDg3LWFmZjVjODkyZTc0MyIsInJlZklkIjoiY2FyLWQxYTJkMzdlIiwiaWF0IjoxNzg0MDEzNDc1LCJleHAiOjIwOTk1ODk0NzV9.Q-g1O-jeTXyf8l_N4Onin8lujZjFNhnNXRKmeGxysz8', '2026-07-14 07:17:55.043'),
('1d1cf1b7-c8c8-4c5e-a59f-bf896e3d8fc5', '8381555b-ce49-4ef9-b856-3ca75fd3596c', 'anon', 'anon', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsInByb2plY3RJZCI6IjgzODE1NTViLWNlNDktNGVmOS1iODU2LTNjYTc1ZmQzNTk2YyIsInJlZklkIjoibmV3LWIwYWIzMGZiIiwiaWF0IjoxNzg0MDA3MjQ0LCJleHAiOjIwOTk1ODMyNDR9._llCEPffswi2acSqbgW7kGTSp2BRvvnCOoVxJO_VcuI', '2026-07-14 05:34:04.431'),
('3d6c6888-85a8-4fb4-9f19-da3bf2e259b4', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', 'anon', 'anon', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsInByb2plY3RJZCI6ImYwNWE5M2YzLWVjYTctNGM4OS1hMDYwLThiNWY2ZTViNjI2ZiIsInJlZklkIjoicHJvLWQ1ODM1YmQ1IiwiaWF0IjoxNzgzOTM5Mjc4LCJleHAiOjIwOTk1MTUyNzh9.ROWdygChk9F6lAPe5vbtIMXO39977yPByuqLtPcEVjM', '2026-07-13 10:41:18.543'),
('58b9af14-69e0-409f-83a0-aca9f26ce533', '8381555b-ce49-4ef9-b856-3ca75fd3596c', 'service_role', 'service_role', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwicHJvamVjdElkIjoiODM4MTU1NWItY2U0OS00ZWY5LWI4NTYtM2NhNzVmZDM1OTZjIiwicmVmSWQiOiJuZXctYjBhYjMwZmIiLCJpYXQiOjE3ODQwMDcyNDQsImV4cCI6MjA5OTU4MzI0NH0.ubZ9ruKCfSazCvDY3nrNag8bMOHGy606Nz81ls31lhg', '2026-07-14 05:34:04.431'),
('9595fe3e-acdb-4fbd-9dea-3afb92dc0bba', '005c3f6a-5f88-4f9c-9d87-aff5c892e743', 'service_role', 'service_role', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwicHJvamVjdElkIjoiMDA1YzNmNmEtNWY4OC00ZjljLTlkODctYWZmNWM4OTJlNzQzIiwicmVmSWQiOiJjYXItZDFhMmQzN2UiLCJpYXQiOjE3ODQwMTM0NzUsImV4cCI6MjA5OTU4OTQ3NX0.JhpdCEEauGR0prTVTeLeGlEWHZbQajme7bk0jji5Mqs', '2026-07-14 07:17:55.043'),
('e51f84d2-0d8e-4618-9441-8eb7a4ab1b74', '3e214022-ee2f-4c0a-b2a9-b3f111bbef51', 'service_role', 'service_role', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwicHJvamVjdElkIjoiM2UyMTQwMjItZWUyZi00YzBhLWIyYTktYjNmMTExYmJlZjUxIiwicmVmSWQiOiJjYXJyc3NzLWI2ZTYyYWQzIiwiaWF0IjoxNzg0MDIwNTI3LCJleHAiOjIwOTk1OTY1Mjd9.Hg25fK_k8aY1P9s0XdiD8EGAtHH2Q3hHKd_wYl0CBs8', '2026-07-14 09:15:27.961'),
('f6be3ac4-e067-466a-92d0-c2d4546ba936', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', 'service_role', 'service_role', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwicHJvamVjdElkIjoiZjA1YTkzZjMtZWNhNy00Yzg5LWEwNjAtOGI1ZjZlNWI2MjZmIiwicmVmSWQiOiJwcm8tZDU4MzViZDUiLCJpYXQiOjE3ODM5MzkyNzgsImV4cCI6MjA5OTUxNTI3OH0.fPxvjmKY7A7GSo3c0-W0ik0HhLH3nz-9eJ8jiXrGCwI', '2026-07-13 10:41:18.543'),
('f95707fc-ac85-4b6c-ae6f-9636b7e62312', '3e214022-ee2f-4c0a-b2a9-b3f111bbef51', 'anon', 'anon', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsInByb2plY3RJZCI6IjNlMjE0MDIyLWVlMmYtNGMwYS1iMmE5LWIzZjExMWJiZWY1MSIsInJlZklkIjoiY2FycnNzcy1iNmU2MmFkMyIsImlhdCI6MTc4NDAyMDUyNywiZXhwIjoyMDk5NTk2NTI3fQ.4d4N_yr2fvzNOL1cQwpBL7sok99I8TF7PJ0cZAurU4Y', '2026-07-14 09:15:27.961');

-- --------------------------------------------------------

--
-- Table structure for table `projectauthprovider`
--

CREATE TABLE `projectauthprovider` (
  `id` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `provider` varchar(191) NOT NULL,
  `clientId` text DEFAULT NULL,
  `clientSecret` text DEFAULT NULL,
  `isEnabled` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectemailtemplate`
--

CREATE TABLE `projectemailtemplate` (
  `id` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `templateType` varchar(191) NOT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `roleName` varchar(191) NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `totalUsers` varchar(191) DEFAULT NULL,
  `permissionsGranted` varchar(191) DEFAULT NULL,
  `createdBy` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `projectId` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `tenantId`, `roleName`, `type`, `totalUsers`, `permissionsGranted`, `createdBy`, `status`, `createdAt`, `updatedAt`, `description`, `name`, `projectId`) VALUES
('13feff0b-f29e-4b17-adf2-eae6bd1003c5', '1dd328f0-f42a-4738-9b03-8e27a5434a93', 'hr', 'Custom', '0', 'None', 'System', 'Active', '2026-07-14 07:45:25.556', '2026-07-14 07:45:25.556', NULL, NULL, NULL),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', NULL, 'Admin', 'System', NULL, NULL, '89218c42-d1c5-4232-b934-c1b11d75b274', 'Active', '2026-07-13 10:41:18.562', '2026-07-13 10:41:18.562', NULL, 'Admin', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', NULL, 'authenticated', 'System', NULL, NULL, '470f9c95-70f6-4b86-81d2-fd57e44cb59c', 'Active', '2026-07-14 09:15:27.994', '2026-07-14 09:15:27.994', NULL, 'authenticated', '3e214022-ee2f-4c0a-b2a9-b3f111bbef51'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', NULL, 'Admin', 'System', NULL, NULL, '04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'Active', '2026-07-14 07:17:55.056', '2026-07-14 07:17:55.056', NULL, 'Admin', '005c3f6a-5f88-4f9c-9d87-aff5c892e743'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', NULL, 'Admin', 'System', NULL, NULL, '470f9c95-70f6-4b86-81d2-fd57e44cb59c', 'Active', '2026-07-14 09:15:27.976', '2026-07-14 09:15:27.976', NULL, 'Admin', '3e214022-ee2f-4c0a-b2a9-b3f111bbef51'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', NULL, 'authenticated', 'System', NULL, NULL, '04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'Active', '2026-07-14 07:17:55.070', '2026-07-14 07:17:55.070', NULL, 'authenticated', '005c3f6a-5f88-4f9c-9d87-aff5c892e743'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', NULL, 'authenticated', 'System', NULL, NULL, '89218c42-d1c5-4232-b934-c1b11d75b274', 'Active', '2026-07-13 10:41:18.581', '2026-07-13 10:41:18.581', NULL, 'authenticated', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', NULL, 'authenticated', 'System', NULL, NULL, '04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'Active', '2026-07-14 05:34:04.471', '2026-07-14 05:34:04.471', NULL, 'authenticated', '8381555b-ce49-4ef9-b856-3ca75fd3596c'),
('db495a43-78f3-4f0c-9874-7737e2c21635', NULL, 'Admin', 'System', NULL, NULL, '04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'Active', '2026-07-14 05:34:04.452', '2026-07-14 05:34:04.452', NULL, 'Admin', '8381555b-ce49-4ef9-b856-3ca75fd3596c');

-- --------------------------------------------------------

--
-- Table structure for table `rolepermission`
--

CREATE TABLE `rolepermission` (
  `roleId` varchar(191) NOT NULL,
  `permissionId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rolepermission`
--

INSERT INTO `rolepermission` (`roleId`, `permissionId`) VALUES
('13feff0b-f29e-4b17-adf2-eae6bd1003c5', 'c176a6d5-9439-48bd-b81e-645faea32ef8'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '0d3560c1-d9aa-460a-8e32-268aed052d0f'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '1fb659f6-4a38-445a-b6d8-c65171e89840'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '25891aeb-fef7-46da-a5bc-5cb2992525b2'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '3ec6a66e-080b-490b-a338-a81530f91068'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '40a7622c-6e34-4225-b24b-854a84dabdbc'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '500f2c85-d904-43ac-900d-88902b0dad06'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '5baa5c8c-9143-4599-8cf5-c5034bac977e'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '7417ff69-ab0b-4c9e-a2b0-58ee13cff703'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '8476d57b-6204-4991-9661-bc20d1995fc1'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '852a30f7-4228-49ee-876f-39dadef884f1'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', '97bae0f3-89f6-4374-9e98-3b3a6e50a73a'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', 'b069c792-9aef-4b57-b273-3d517db471b3'),
('4203f92e-d09c-40f6-873a-d8f7c01e9e02', 'fe6d1cb2-b259-4900-88ce-2ad8a95a4d50'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('49d91a78-eca7-44be-bb15-8956b3f552ac', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '0d3560c1-d9aa-460a-8e32-268aed052d0f'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '1fb659f6-4a38-445a-b6d8-c65171e89840'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '25891aeb-fef7-46da-a5bc-5cb2992525b2'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '3ec6a66e-080b-490b-a338-a81530f91068'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '40a7622c-6e34-4225-b24b-854a84dabdbc'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '500f2c85-d904-43ac-900d-88902b0dad06'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '5baa5c8c-9143-4599-8cf5-c5034bac977e'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '7417ff69-ab0b-4c9e-a2b0-58ee13cff703'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '8476d57b-6204-4991-9661-bc20d1995fc1'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '852a30f7-4228-49ee-876f-39dadef884f1'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', '97bae0f3-89f6-4374-9e98-3b3a6e50a73a'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', 'b069c792-9aef-4b57-b273-3d517db471b3'),
('6dc50dc2-a320-439a-943d-10b59cb34f85', 'fe6d1cb2-b259-4900-88ce-2ad8a95a4d50'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '0d3560c1-d9aa-460a-8e32-268aed052d0f'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '1fb659f6-4a38-445a-b6d8-c65171e89840'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '25891aeb-fef7-46da-a5bc-5cb2992525b2'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '3ec6a66e-080b-490b-a338-a81530f91068'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '40a7622c-6e34-4225-b24b-854a84dabdbc'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '500f2c85-d904-43ac-900d-88902b0dad06'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '5baa5c8c-9143-4599-8cf5-c5034bac977e'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '7417ff69-ab0b-4c9e-a2b0-58ee13cff703'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '8476d57b-6204-4991-9661-bc20d1995fc1'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '852a30f7-4228-49ee-876f-39dadef884f1'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '97bae0f3-89f6-4374-9e98-3b3a6e50a73a'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', 'b069c792-9aef-4b57-b273-3d517db471b3'),
('9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', 'fe6d1cb2-b259-4900-88ce-2ad8a95a4d50'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('ace4f7ed-0623-4123-8ab5-62939f59a7f1', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('ad6bb2a2-0907-4252-a705-5c4f65aa6de1', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('d1a56f8f-467d-4dde-b119-ea5d89c7d4ac', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '0d3560c1-d9aa-460a-8e32-268aed052d0f'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '1fb659f6-4a38-445a-b6d8-c65171e89840'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '1fd250b8-235a-43f9-919a-1d040ca682cb'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '25891aeb-fef7-46da-a5bc-5cb2992525b2'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '26e0a9d4-397f-493c-ac1a-45f719fc9edd'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '2adb8ff2-668f-43e7-8438-f3341dda0aae'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '3ec6a66e-080b-490b-a338-a81530f91068'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '40a7622c-6e34-4225-b24b-854a84dabdbc'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '500f2c85-d904-43ac-900d-88902b0dad06'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '5baa5c8c-9143-4599-8cf5-c5034bac977e'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '7417ff69-ab0b-4c9e-a2b0-58ee13cff703'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '77d44eb3-63f3-4d37-9724-cab0befbd4dc'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '83a5c1f2-660f-4a86-880f-4a4faf7ef45f'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '8476d57b-6204-4991-9661-bc20d1995fc1'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '852a30f7-4228-49ee-876f-39dadef884f1'),
('db495a43-78f3-4f0c-9874-7737e2c21635', '97bae0f3-89f6-4374-9e98-3b3a6e50a73a'),
('db495a43-78f3-4f0c-9874-7737e2c21635', 'b069c792-9aef-4b57-b273-3d517db471b3'),
('db495a43-78f3-4f0c-9874-7737e2c21635', 'fe6d1cb2-b259-4900-88ce-2ad8a95a4d50');

-- --------------------------------------------------------

--
-- Table structure for table `scheduledreport`
--

CREATE TABLE `scheduledreport` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `reportName` varchar(191) NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `schedule` varchar(191) DEFAULT NULL,
  `recipients` varchar(191) DEFAULT NULL,
  `lastRun` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `user` varchar(191) DEFAULT NULL,
  `browser` varchar(191) DEFAULT NULL,
  `os` varchar(191) DEFAULT NULL,
  `device` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `lastActivity` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `smstemplate`
--

CREATE TABLE `smstemplate` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `templateName` varchar(191) NOT NULL,
  `messageBody` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `storagebucket`
--

CREATE TABLE `storagebucket` (
  `id` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `isPublic` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storagebucket`
--

INSERT INTO `storagebucket` (`id`, `projectId`, `name`, `isPublic`, `createdAt`, `updatedAt`) VALUES
('4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', 'car-images', 1, '2026-07-14 06:36:02.682', '2026-07-14 06:36:02.682');

-- --------------------------------------------------------

--
-- Table structure for table `storagefile`
--

CREATE TABLE `storagefile` (
  `id` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `bucketId` varchar(191) NOT NULL,
  `originalName` varchar(191) NOT NULL,
  `storedName` varchar(191) NOT NULL,
  `path` varchar(191) NOT NULL,
  `mimeType` varchar(191) NOT NULL,
  `extension` varchar(191) NOT NULL,
  `size` int(11) NOT NULL,
  `uploadedBy` varchar(191) DEFAULT NULL,
  `visibility` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storagefile`
--

INSERT INTO `storagefile` (`id`, `projectId`, `bucketId`, `originalName`, `storedName`, `path`, `mimeType`, `extension`, `size`, `uploadedBy`, `visibility`, `createdAt`, `updatedAt`) VALUES
('1855b3a9-3c27-4806-b3e2-6ecd701467c6', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l9.png', 'a10b70a145ee8e9490c5e40de46611d2.png', '1784011555447_fp8b.png', 'image/png', '.png', 211018, 'ak@gmail.com', 'public', '2026-07-14 06:45:55.510', '2026-07-14 06:45:55.510'),
('22e17b39-9d1f-4deb-aafa-496712dd0957', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l9.png', '1d77880d8c47cd99cffdf1a9ba6d1f10.png', '1784012755679_n1lbge.png', 'image/png', '.png', 211018, 'ak@gmail.com', 'public', '2026-07-14 07:05:55.864', '2026-07-14 07:05:55.864'),
('58715ca5-51a0-410c-b926-e7b78978db22', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', 'ecc4ff52b7100d35e9b5bd5e15731eab.png', '1784010971925_ne1lpq.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:36:11.987', '2026-07-14 06:36:11.987'),
('a12f578f-15e6-4018-aa82-e834844e4227', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', '82f2cd967eec839c19fbbb67fb2ec2a1.png', '1784012033246_pn13y7.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:53:53.365', '2026-07-14 06:53:53.365'),
('b04b862d-f6b2-434a-9a9e-f4541b1c53ba', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', '495736b0d947e9601c6ab691efd286f4.png', '1784011163923_7leioki.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:39:24.015', '2026-07-14 06:39:24.015'),
('b7a8a952-a690-4d28-9f2d-c963e35f2cce', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', 'da09b226ee009796e7bc3b5410c8d19b.png', '1784011186859_9aoiii.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:39:46.926', '2026-07-14 06:39:46.926'),
('cb92186c-263f-408e-9cb0-099683de7ce7', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', '2a61da7134ffacf56326bbff5b7dccef.png', '1784011517454_ymq2h.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:45:17.565', '2026-07-14 06:45:17.565'),
('cf0cb153-a180-452c-9dbc-eea4e39e75ae', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', 'a5548c23fad4ccf9c022ac317642277a.png', '1784012156784_zuw28i.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:55:56.906', '2026-07-14 06:55:56.906'),
('fe83eb1c-9c77-4d61-badd-5a1541f9ec54', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '4df6a0db-bac9-4c01-884e-11ec416ae6fa', 'l8.png', '80be7dcf964acffe5f7a4ab617287c6c.png', '1784010962759_lr3f5j.png', 'image/png', '.png', 172750, 'ak@gmail.com', 'public', '2026-07-14 06:36:02.937', '2026-07-14 06:36:02.937');

-- --------------------------------------------------------

--
-- Table structure for table `subsidiaryorganization`
--

CREATE TABLE `subsidiaryorganization` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `owner` varchar(191) DEFAULT NULL,
  `users` varchar(191) DEFAULT NULL,
  `branches` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subsidiaryorganization`
--

INSERT INTO `subsidiaryorganization` (`id`, `tenantId`, `name`, `owner`, `users`, `branches`, `status`, `createdAt`, `updatedAt`) VALUES
('9b4e8ba0-9051-4612-b2dc-b24be15eab29', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'google', 'ceo', '0', 'IT', 'Active', '2026-07-14 09:51:48.809', '2026-07-14 09:51:48.809'),
('a0e0f20d-a485-4671-a3c8-2ad123d8ca78', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'google', 'ceo', '2', 'IT', 'Active', '2026-07-14 09:18:10.845', '2026-07-14 09:18:10.845');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `departmentId` varchar(191) DEFAULT NULL,
  `teamName` varchar(191) NOT NULL,
  `lead` varchar(191) DEFAULT NULL,
  `members` varchar(191) DEFAULT NULL,
  `velocity` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `tenantId`, `departmentId`, `teamName`, `lead`, `members`, `velocity`, `status`, `createdAt`, `updatedAt`) VALUES
('9d80cfe4-c18e-47b4-911c-5f3474d21322', '7a5ea345-376d-463a-b458-12648cb60e20', 'a5abb935-fa91-4b2c-b052-574d5779ca44', 'frontend squad', 'meeee', '3', '32', 'Active', '2026-07-14 08:58:00.932', '2026-07-14 08:58:00.932');

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `id` varchar(191) NOT NULL,
  `organization` varchar(191) NOT NULL,
  `owner` varchar(191) DEFAULT NULL,
  `totalUsers` varchar(191) DEFAULT NULL,
  `branchesCount` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdDate` varchar(191) DEFAULT NULL,
  `plan` varchar(191) DEFAULT NULL,
  `databaseSize` varchar(191) DEFAULT NULL,
  `domain` varchar(191) DEFAULT NULL,
  `provider` varchar(191) DEFAULT NULL,
  `sslStatus` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`id`, `organization`, `owner`, `totalUsers`, `branchesCount`, `status`, `createdDate`, `plan`, `databaseSize`, `domain`, `provider`, `sslStatus`, `createdAt`, `updatedAt`) VALUES
('1dd328f0-f42a-4738-9b03-8e27a5434a93', 'Kiaan Core HQ', NULL, NULL, NULL, 'Active', NULL, NULL, NULL, 'hq.kiaan.core', NULL, NULL, '2026-07-13 10:40:19.193', '2026-07-13 10:40:19.193'),
('4c9efe9a-84ea-4fbe-a58c-ef63ddbf0b72', 'Admin Tenant', NULL, NULL, NULL, 'Active', NULL, NULL, NULL, 'admin.kiaan.core', NULL, NULL, '2026-07-13 08:43:22.833', '2026-07-13 08:43:22.833'),
('5f0b2034-6f41-440d-97ef-5fe3e221e6a9', 'tanantt1', NULL, '0', '0', 'Active', '2026-07-14T09:44:22.635Z', 'Free', '0 GB', NULL, NULL, NULL, '2026-07-14 09:44:22.640', '2026-07-14 09:44:22.640'),
('7a5ea345-376d-463a-b458-12648cb60e20', 'Kiaan Core HQ', NULL, NULL, NULL, 'Active', NULL, NULL, NULL, 'hq.kiaan.core', NULL, NULL, '2026-07-13 10:39:58.528', '2026-07-13 10:39:58.528'),
('7c66b3f3-c11d-448b-87d8-760af65aafa9', 'Kiaan Core HQ', NULL, NULL, NULL, 'Active', NULL, NULL, NULL, 'hq.kiaan.core', NULL, NULL, '2026-07-13 10:39:36.497', '2026-07-13 10:39:36.497'),
('bf920a7b-322e-4f66-b09b-a7476a339352', 'kia', NULL, NULL, NULL, 'Active', NULL, NULL, NULL, 'kia.kiaan.core', NULL, NULL, '2026-07-13 08:45:22.449', '2026-07-13 08:45:22.449');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) DEFAULT NULL,
  `role` varchar(191) DEFAULT NULL,
  `organization` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `lastLogin` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `tenantId`, `name`, `email`, `passwordHash`, `role`, `organization`, `status`, `lastLogin`, `createdAt`, `updatedAt`) VALUES
('04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'bf920a7b-322e-4f66-b09b-a7476a339352', 'kiran', 'kiran@gmail.com', '$2b$10$ADOqvZt6F7Bp/XbHEX43oOZaIYgvRH7EDtOW1YL.9UirTlJfaJ4uW', NULL, NULL, 'Active', NULL, '2026-07-13 08:45:22.769', '2026-07-13 08:45:22.769'),
('1016b14c-22a2-4058-a79a-3f0ad8e25ef7', '1dd328f0-f42a-4738-9b03-8e27a5434a93', 'rahul', 'john@gmail.com', NULL, 'Staff', 'Default Tenant', 'Active', 'Never', '2026-07-14 07:42:59.206', '2026-07-14 07:42:59.206'),
('470f9c95-70f6-4b86-81d2-fd57e44cb59c', '4c9efe9a-84ea-4fbe-a58c-ef63ddbf0b72', 'Admin User', 'boilerplate@gmail.com', '$2b$10$P4vEVNGD2ZEwGZBxv.4b8.zAaxVUk7lycyfAOY7RSZcmUjUUVMtkS', 'Super Admin', NULL, 'Active', NULL, '2026-07-13 08:43:22.951', '2026-07-13 08:43:22.951'),
('89218c42-d1c5-4232-b934-c1b11d75b274', '1dd328f0-f42a-4738-9b03-8e27a5434a93', 'Super Admin', 'admin@kiaan.com', '$2b$10$FjdRBvXHeemS2HlnKl2aSu3QA/MyUwDZuUaCy4Lz.Gn9.cKPrcMvK', NULL, NULL, 'Active', NULL, '2026-07-13 10:40:19.327', '2026-07-13 10:40:19.327');

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--

CREATE TABLE `userrole` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `roleId` varchar(191) NOT NULL,
  `projectId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`id`, `userId`, `roleId`, `projectId`, `createdAt`, `updatedAt`) VALUES
('03cd506e-e97e-4137-9624-79226aec01d2', '04c57a09-7dc7-48a4-946e-9055ff2a2e06', '6dc50dc2-a320-439a-943d-10b59cb34f85', '005c3f6a-5f88-4f9c-9d87-aff5c892e743', '2026-07-14 07:17:55.221', '2026-07-14 07:17:55.221'),
('2d50200e-3cc9-4183-979c-5bb7ac4c5be8', '470f9c95-70f6-4b86-81d2-fd57e44cb59c', '9dd4198f-e21c-40c9-b67c-0f3b462e1ab7', '3e214022-ee2f-4c0a-b2a9-b3f111bbef51', '2026-07-14 09:15:28.123', '2026-07-14 09:15:28.123'),
('c303c4fc-da43-4a9c-b043-3e3b4552141f', '89218c42-d1c5-4232-b934-c1b11d75b274', '4203f92e-d09c-40f6-873a-d8f7c01e9e02', 'f05a93f3-eca7-4c89-a060-8b5f6e5b626f', '2026-07-13 10:41:18.751', '2026-07-13 10:41:18.751'),
('e88fa636-fea4-48b5-8512-6d3152709c6b', '04c57a09-7dc7-48a4-946e-9055ff2a2e06', 'db495a43-78f3-4f0c-9874-7737e2c21635', '8381555b-ce49-4ef9-b856-3ca75fd3596c', '2026-07-14 05:34:04.670', '2026-07-14 05:34:04.670');

-- --------------------------------------------------------

--
-- Table structure for table `webhook`
--

CREATE TABLE `webhook` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `endpointUrl` varchar(191) NOT NULL,
  `events` varchar(191) DEFAULT NULL,
  `environment` varchar(191) DEFAULT NULL,
  `successRate` varchar(191) DEFAULT NULL,
  `lastPing` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `whatsapptemplate`
--

CREATE TABLE `whatsapptemplate` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `templateName` varchar(191) NOT NULL,
  `messageBody` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workflow`
--

CREATE TABLE `workflow` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) DEFAULT NULL,
  `workflowName` varchar(191) NOT NULL,
  `trigger` varchar(191) DEFAULT NULL,
  `activeRuns` varchar(191) DEFAULT NULL,
  `successRate` varchar(191) DEFAULT NULL,
  `lastExecution` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ailog`
--
ALTER TABLE `ailog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiprovider`
--
ALTER TABLE `aiprovider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aitemplate`
--
ALTER TABLE `aitemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apikey`
--
ALTER TABLE `apikey`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auditlog`
--
ALTER TABLE `auditlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `automation`
--
ALTER TABLE `automation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Branch_tenantId_fkey` (`tenantId`);

--
-- Indexes for table `branding`
--
ALTER TABLE `branding`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Department_tenantId_fkey` (`tenantId`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emailtemplate`
--
ALTER TABLE `emailtemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knowledgebase`
--
ALTER TABLE `knowledgebase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loginlog`
--
ALTER TABLE `loginlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notificationlog`
--
ALTER TABLE `notificationlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Permission_resource_action_key` (`resource`,`action`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Project_refId_key` (`refId`),
  ADD KEY `Project_tenantId_idx` (`tenantId`);

--
-- Indexes for table `projectapikey`
--
ALTER TABLE `projectapikey`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProjectApiKey_keyToken_key` (`keyToken`),
  ADD KEY `ProjectApiKey_projectId_idx` (`projectId`);

--
-- Indexes for table `projectauthprovider`
--
ALTER TABLE `projectauthprovider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProjectAuthProvider_projectId_provider_key` (`projectId`,`provider`),
  ADD KEY `ProjectAuthProvider_projectId_idx` (`projectId`);

--
-- Indexes for table `projectemailtemplate`
--
ALTER TABLE `projectemailtemplate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ProjectEmailTemplate_projectId_templateType_key` (`projectId`,`templateType`),
  ADD KEY `ProjectEmailTemplate_projectId_idx` (`projectId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Role_projectId_idx` (`projectId`);

--
-- Indexes for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD PRIMARY KEY (`roleId`,`permissionId`),
  ADD KEY `RolePermission_permissionId_fkey` (`permissionId`);

--
-- Indexes for table `scheduledreport`
--
ALTER TABLE `scheduledreport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smstemplate`
--
ALTER TABLE `smstemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `storagebucket`
--
ALTER TABLE `storagebucket`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `StorageBucket_projectId_name_key` (`projectId`,`name`),
  ADD KEY `StorageBucket_projectId_idx` (`projectId`);

--
-- Indexes for table `storagefile`
--
ALTER TABLE `storagefile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `StorageFile_bucketId_path_key` (`bucketId`,`path`),
  ADD KEY `StorageFile_projectId_idx` (`projectId`),
  ADD KEY `StorageFile_bucketId_idx` (`bucketId`);

--
-- Indexes for table `subsidiaryorganization`
--
ALTER TABLE `subsidiaryorganization`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SubsidiaryOrganization_tenantId_fkey` (`tenantId`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Team_tenantId_fkey` (`tenantId`),
  ADD KEY `Team_departmentId_fkey` (`departmentId`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_tenantId_fkey` (`tenantId`);

--
-- Indexes for table `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UserRole_userId_roleId_projectId_key` (`userId`,`roleId`,`projectId`),
  ADD KEY `UserRole_userId_idx` (`userId`),
  ADD KEY `UserRole_roleId_idx` (`roleId`),
  ADD KEY `UserRole_projectId_idx` (`projectId`);

--
-- Indexes for table `webhook`
--
ALTER TABLE `webhook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whatsapptemplate`
--
ALTER TABLE `whatsapptemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `Branch_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `Department_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `Project_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectapikey`
--
ALTER TABLE `projectapikey`
  ADD CONSTRAINT `ProjectApiKey_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectauthprovider`
--
ALTER TABLE `projectauthprovider`
  ADD CONSTRAINT `ProjectAuthProvider_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projectemailtemplate`
--
ALTER TABLE `projectemailtemplate`
  ADD CONSTRAINT `ProjectEmailTemplate_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `Role_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rolepermission`
--
ALTER TABLE `rolepermission`
  ADD CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RolePermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `storagebucket`
--
ALTER TABLE `storagebucket`
  ADD CONSTRAINT `StorageBucket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `storagefile`
--
ALTER TABLE `storagefile`
  ADD CONSTRAINT `StorageFile_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `storagebucket` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subsidiaryorganization`
--
ALTER TABLE `subsidiaryorganization`
  ADD CONSTRAINT `SubsidiaryOrganization_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `Team_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Team_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `UserRole_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
