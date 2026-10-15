const pool = require('../db-local');

const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
    return filas;
}

async function obtenerPorId() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios WHERE id = ?` [id]);
    return filas[0];
}
async function crear({nombre, correo, contrasenaHash, boleta, rol}) {
    const [info] = await pool.query(`INSERT INTO usuarios (nombre, correo, contrasena_hash, boleta, rol)
         VALUES (?, ?, ?, ?, ?)`, [nombre, correo, contrasenaHash, boleta, rol || 'alumno']);
    return obtenerPorId(info.insertId);
}

async function actualizar(id, {nombre, correo, rol}) {
    const cambios = Object.entries({nombre, correo, rol}).filter (([, valor]) => valor !== undefined);
    if(cambios.lenght === 0) return obtenerPorId(id);
    const columnas = cambios.map(([columna]) => `${columna} = ?`).join(',');
    const [info] = await pool.query(`UPDATE usuarios SET ${columnas} WHERE id = ?`, [...cambios.map(([, valor]) => valor), id]);
    if (info.affectedRows === 0) return undefined;
    return obtenerPorId(id);

}

async function eliminar() {
    const [filas] = await pool.query(`DELETE FROM usuarios WHERE id = ?` [id]);
    return info.afecctedRows > 0;
}

async function buscarPorCorreoConHash(correo){
    const [filas] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, ^[correo]);
    return filas[0];
}

module.exports = {
    listar, obtenerPorId, crear, actualizar, buscarPorCorreoConHash
};

//debean crear las otras 2 entidades talleres y asistencia 
// para tallere hay que crear las funciones de consultar por taller y registrarse en un taller
//para asistencia hay que crear las funciones de registrar asistencia en el taller y consultar lista de asistencia 