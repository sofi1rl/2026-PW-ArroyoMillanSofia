function crearModeloTokens(pool) {
  // Revocar token
  async function revocar(jti, usuario, exp) {
    await pool.query(
      `INSERT INTO tokens_revocados (jti, usuario, expira)
       VALUES (?, ?, FROM_UNIXTIME(?))`,
      [jti, usuario, exp]
    );
  }

  // Consultar si un token está revocado
  async function estaRevocado(jti) {
    const [filas] = await pool.query(
      'SELECT 1 FROM tokens_revocados WHERE jti = ? LIMIT 1',
      [String(jti || '')]
    );
    return filas.length > 0;
  }

  // Listar tokens revocados
  async function listar() {
    const [filas] = await pool.query(
      'SELECT jti, usuario, expira, revocado_en FROM tokens_revocados ORDER BY revocado_en DESC, jti'
    );
    return filas;
  }

  return { revocar, estaRevocado, listar };
}

module.exports = { crearModeloTokens };