const pool = require('./db-local');

const COLUMNAS_PUBLICAS = 'id, nombre, correo, boleta, rol';

async function listar() {
    const [filas] = await pool.query(`SELECT ${COLUMNAS_PUBLICAS} FROM usuarios ORDER BY id`);
}