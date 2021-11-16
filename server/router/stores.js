const express = require('express');
const storesController = require('../controller/stores');

const router = express.Router();

router.get('/', storesController.getAllStores);
router.get('/:storeName', storesController.getStoreByName);
router.get('/geolocation/:postcode', storesController.getGeoLocationByPostcode);
router.post('/:postcode', storesController.getAllStoresByGeoLocation);

module.exports = router;
