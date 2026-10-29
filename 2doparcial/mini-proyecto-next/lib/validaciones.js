// Mismas reglas que valida el backend (express-proyecto/validaciones.js).

export function validarNombre(nombre) {
  if (typeof nombre !== 'string') return false;
  const limpio = nombre.trim();
  return /^\p{L}+(?: +\p{L}+){0,3}$/u.test(limpio);
}

export function validarBoleta(boleta) {
  return /^[0-9]{10}$/.test(String(boleta || '').trim());
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo || '').trim());
}

export function validarContrasena(contrasena) {
  return typeof contrasena === 'string' && contrasena.length >= 8;
}
