const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

const requerirAutenticacion = (req, res, next) => {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.status(403).send('<h1>403 - Acceso denegado</h1><p>Debes iniciar sesión.</p><a href="/">Volver al Login</a>');
    }
};


router.get('/', usuarioController.mostrarLogin);
router.post('/login', usuarioController.procesarLogin);


router.get('/index', requerirAutenticacion, usuarioController.mostrarIndex);

router.get('/crear', requerirAutenticacion, usuarioController.mostrarCrear);
router.post('/crear', requerirAutenticacion, usuarioController.procesarCrear);

router.get('/editar/:rut', requerirAutenticacion, usuarioController.mostrarEditar);
router.post('/editar/:rut', requerirAutenticacion, usuarioController.procesarEditar);

router.get('/eliminar/:rut', requerirAutenticacion, usuarioController.procesarEliminar);

router.get('/salir', usuarioController.cerrarSesion);

module.exports = router;