const UsuarioModel = require('../models/UsuarioModel');

const mostrarLogin = (req, res) => {
    if (req.session && req.session.usuario) {
        return res.redirect('/index');
    }
    res.render('usuarios/login', { error: null });
};

const procesarLogin = (req, res) => {
    const { nombreUsuario, clave } = req.body;
    const usuarioValido = UsuarioModel.validarUsuario(nombreUsuario, clave);

    if (usuarioValido) {
        req.session.usuario = { rut: usuarioValido.rut, nombre: usuarioValido.nombreUsuario };
        res.redirect('/index');
    } else {
        res.render('usuarios/login', { error: 'Credenciales incorrectas. Intenta de nuevo.' });
    }
};

const mostrarIndex = (req, res) => {
    const listaUsuarios = UsuarioModel.obtenerTodos();
    res.render('usuarios/index', { 
        nombre: req.session.usuario.nombre, 
        usuarios: listaUsuarios 
    });
};

const mostrarCrear = (req, res) => {
    res.render('usuarios/crear', { nombre: req.session.usuario.nombre, error: null });
};

const procesarCrear = (req, res) => {
    const { rut, nombreUsuario, clave } = req.body;
    const exito = UsuarioModel.crearUsuario(rut, nombreUsuario, clave);
    
    if (exito) {
        res.redirect('/index');
    } else {
        res.render('usuarios/crear', { nombre: req.session.usuario.nombre, error: 'El RUT ya existe en el sistema.' });
    }
};

const mostrarEditar = (req, res) => {
    const rut = req.params.rut; // Obtenemos el RUT de la URL
    const usuarioAEditar = UsuarioModel.obtenerPorRut(rut);
    
    if (usuarioAEditar) {
        res.render('usuarios/editar', { nombre: req.session.usuario.nombre, usuarioData: usuarioAEditar });
    } else {
        res.redirect('/index');
    }
};

const procesarEditar = (req, res) => {
    const rutOriginal = req.params.rut;
    const { rut, nombreUsuario, clave } = req.body;
    
    UsuarioModel.actualizarUsuario(rutOriginal, rut, nombreUsuario, clave);
    
    
    if (req.session.usuario.rut === rutOriginal) {
        req.session.usuario.rut = rut;
        req.session.usuario.nombre = nombreUsuario;
    }
    
    res.redirect('/index');
};

const procesarEliminar = (req, res) => {
    const rut = req.params.rut;
    UsuarioModel.eliminarUsuario(rut);
    
    
    if (req.session.usuario.rut === rut) {
        return res.redirect('/salir');
    }
    res.redirect('/index');
};

const cerrarSesion = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = { 
    mostrarLogin, procesarLogin, 
    mostrarIndex, 
    mostrarCrear, procesarCrear, 
    mostrarEditar, procesarEditar, 
    procesarEliminar, cerrarSesion 
};