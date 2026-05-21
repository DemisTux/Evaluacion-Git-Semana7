
let usuarios = [
    { rut: "11111111-1", nombreUsuario: "admin", clave: "123" }
];

const validarUsuario = (nombreUsuario, clave) => {
    return usuarios.find(u => u.nombreUsuario === nombreUsuario && u.clave === clave);
};

const obtenerTodos = () => {
    return usuarios;
};

const obtenerPorRut = (rut) => {
    return usuarios.find(u => u.rut === rut);
};

const crearUsuario = (rut, nombreUsuario, clave) => {
    const existe = obtenerPorRut(rut);
    if (!existe) {
        usuarios.push({ rut, nombreUsuario, clave });
        return true;
    }
    return false;
};

const actualizarUsuario = (rutOriginal, nuevoRut, nuevoNombre, nuevaClave) => {
    const index = usuarios.findIndex(u => u.rut === rutOriginal);
    if (index !== -1) {
        usuarios[index] = { rut: nuevoRut, nombreUsuario: nuevoNombre, clave: nuevaClave };
        return true;
    }
    return false;
};

const eliminarUsuario = (rut) => {
    usuarios = usuarios.filter(u => u.rut !== rut);
};

module.exports = { 
    validarUsuario, 
    obtenerTodos, 
    obtenerPorRut, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
};