const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.homePage));
router.get('/add', catchErrors(storeController.addStore));
router.get('/stores', catchErrors(storeController.getStores));
router.post('/add',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore)
);
router.post('/add/:id',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore)
);
router.get('/store/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);

// 1. validate the registration data
// 2. register the user
// 3. we need to log them in

router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

module.exports = router;
