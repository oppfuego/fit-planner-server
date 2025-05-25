const Router = require('express');
const router = new Router();
const basicAuth = require('../middleware/basicAuth.middleware');
const userController = require('../controllers/user.controller');
const upload = require('../middleware/upload.middleware');

router.get('/get-all', userController.getAll);
router.get('/get-user', basicAuth, userController.getUser);
router.post('/update-avatar', upload.single('avatar'), userController.updateAvatar);
router.delete('/delete', userController.delete);

module.exports = router;