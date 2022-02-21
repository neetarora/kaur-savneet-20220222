
const router = require('express').Router();
const controller = require('../components/user/controller');
const { isAuthenticated, asyncExecute, isUserTypeAllowed } = require('../middlewares');
const { USERTYPE_USER } = require('../constants/model');
router.post('/login', asyncExecute(controller.login));
router.post('/resetpass', asyncExecute(controller.forgotPassword));
router.get('/verify-code', asyncExecute(controller.verifyCode));


router.post('/register', asyncExecute(controller.create));

router.get('/:userId', asyncExecute(isAuthenticated), isUserTypeAllowed(USERTYPE_USER), asyncExecute(controller.getById));

module.exports = router;