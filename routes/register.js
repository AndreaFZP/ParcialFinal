var express = require('express');
var router = express.Router();
var casaController = require('../controllers/CasaController');


router.get('/', function(req, res) {
    res.render('register', { title: 'Registro' });
  });


router.post('/', casaController.register);




module.exports = router;