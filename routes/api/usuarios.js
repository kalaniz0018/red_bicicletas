var express = require('express');
var router = express.Router();
var usuarioControllerApi = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioControllerApi.usuarios_list);
router.post('/create', usuarioControllerApi.usuarios_create);
router.post('/reservar', usuarioControllerApi.usuario_reserva);

module.exports = router;