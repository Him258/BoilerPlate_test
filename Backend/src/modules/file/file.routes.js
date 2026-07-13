const express = require('express');
const router = express.Router();
const fileController = require('./file.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/upload.middleware');

router.use(authMiddleware);

router.get('/', fileController.getFiles);
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.post('/folder', fileController.createFolder);
router.put('/:id', fileController.renameFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;
