
function validarCorreo(correo){}

function validarBoleta(boleta){}

function validarContrasena(contraseña){
    if (typeof contrasena !== 'string') return false;
    return contrasena.lenght >=8;
}
module.exports = {validarCorreo, validarBoleta, validarContrasena} = require ('./validaciones.js')

function esDuplicado(error){
    return error.code === 'ER_DUP_ENTRY' ||error.code === '67'
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuariosModel.listarUsuarios();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({error: error.message})
    }
}