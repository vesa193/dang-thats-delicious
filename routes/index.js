const express = require('express');
const router = express.Router();
const storeContoller = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeContoller.homePage));
router.get('/add', catchErrors(storeContoller.addStore));
router.get('/stores', catchErrors(storeContoller.getStores));
router.post('/add', catchErrors(storeContoller.createStore));
router.post('/add/:id', catchErrors(storeContoller.updateStore));
router.get('/store/:id/edit', catchErrors(storeContoller.editStore));

module.exports = router;
