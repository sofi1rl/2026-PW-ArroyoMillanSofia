import { useState, useEffect } from 'react';
import { pedirJSON } from '../lib/api';
import { ocultarBoleta } from '../lib/formato';
import { validarNombre, validarBoleta, validarCorreo, validarContrasena } from '../lib/validaciones';
import estilos from '../styles/Talleres.module.css';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Formulario de registro
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [boleta, setBoleta] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      setUsuarios(await pedirJSON('/usuarios'));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function registrar(e) {
    e.preventDefault();
    setErrorForm('');
    setExito('');

    const datos = { nombre: nombre.trim(), correo: correo.trim(), boleta: boleta.trim(), contrasena };

    // El front avisa rápido; el backend vuelve a validar todo (Postman se salta el front).
    if (!validarNombre(datos.nombre)) {
      return setErrorForm('El nombre debe tener de 1 a 4 palabras y contener solo letras.');
    }
    if (!validarCorreo(datos.correo)) return setErrorForm('El correo no tiene un formato válido.');
    if (!validarBoleta(datos.boleta)) return setErrorForm('La boleta debe tener 10 dígitos.');
    if (!validarContrasena(datos.contrasena)) return setErrorForm('La contraseña debe tener al menos 8 caracteres.');
    if (datos.contrasena !== confirmar) return setErrorForm('Las contraseñas no coinciden.');

    setEnviando(true);
    try {
      const nuevo = await pedirJSON('/usuarios', { method: 'POST', body: JSON.stringify(datos) });
      setNombre('');
      setCorreo('');
      setBoleta('');
      setContrasena('');
      setConfirmar('');
      await cargarUsuarios();
      setExito(`¡Listo! ${nuevo.nombre} quedó registrado(a).`);
    } catch (err) {
      setErrorForm(err.message); // por ejemplo: "Ya existe un usuario con ese correo o boleta"
    } finally {
      setEnviando(false);
    }
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = usuarios.filter((u) => `${u.nombre} ${u.correo} ${u.rol}`.toLowerCase().includes(texto));

  return (
    <main>
      <h1>Usuarios</h1>

      <section className={estilos.panel}>
        <h2>Registrar usuario</h2>
        <form onSubmit={registrar} className="formulario" noValidate>
          <input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input placeholder="Boleta (10 dígitos)" value={boleta} onChange={(e) => setBoleta(e.target.value)} />
          <input
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          <button type="submit" disabled={enviando}>{enviando ? 'Registrando…' : 'Registrar'}</button>
        </form>
        {errorForm && <p className="error">{errorForm}</p>}
        {exito && <p className={estilos.exito}>{exito}</p>}
      </section>

      <h2>Usuarios registrados ({usuarios.length})</h2>
      <input
        className={estilos.buscador}
        type="search"
        placeholder="Buscar por nombre, correo o rol"
        aria-label="Buscar usuarios por nombre, correo o rol"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p>Cargando usuarios…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && usuarios.length === 0 && <p>No hay usuarios registrados.</p>}
      {!cargando && !error && usuarios.length > 0 && visibles.length === 0 && (
        <p>No hay usuarios que coincidan con la búsqueda.</p>
      )}

      {visibles.length > 0 && (
        <div className={estilos.tablaScroll}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Boleta</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{ocultarBoleta(u.boleta)}</td>
                  <td>{u.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
