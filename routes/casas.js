var express = require('express');
var router = express.Router();
var casaController = require('../controllers/CasaController');

router.get('/:casaname', casaController.getOne);
router.get('/', casaController.getAll);


router.get('/:casaname', casaController.getOne);


router.post('/',casaController.register);
router.put('/:casaname', casaController.update);
router.delete('/:casaname',casaController.delete);

module.exports = router;