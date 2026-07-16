const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');
const tenantRoutes = require('./modules/tenant/tenant.routes');
const projectRoutes = require('./modules/project/project.routes');
const databaseRoutes = require('./modules/database/database.routes');
const rbacRoutes = require('./modules/rbac/rbac.routes');
const rlsRoutes = require('./modules/rls/rls.routes');
const storageRoutes = require('./modules/storage/storage.routes');

const router = express.Router();

// Expose modules as independent APIs
router.use('/auth/v1', authRoutes);
router.use('/tenants/v1', tenantRoutes);
router.use('/projects/v1', projectRoutes);
router.use('/rest/v1', databaseRoutes);
router.use('/rbac/v1', rbacRoutes);
router.use('/rls/v1', rlsRoutes);
router.use('/storage/v1', storageRoutes);

module.exports = router;
