
function validarCorreo(correo){}

function validarBoleta(boleta){}

function validarContrasena(contraseña){
    if (typeof contrasena !== 'string') return false;
    return contrasena.lenght >=8;
}
module.exports = {validarCorreo, validarBoleta, validarContrasena} = require ('./validaciones.js')