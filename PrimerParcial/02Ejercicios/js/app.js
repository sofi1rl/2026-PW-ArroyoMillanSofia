

document.addEventListener('DOMContentLoaded', () => {

    // DATOS DE PRUEBA
    const talleres = [
      { nombre: 'Introducción a Python', instructor: 'Ing. María López', cupo: 25, inscritos: 25 },
      { nombre: 'Fundamentos de Redes', instructor: 'Ing. Carlos Ramírez', cupo: 30, inscritos: 18 },
      { nombre: 'Diseño de Bases de Datos', instructor: 'Ing. Ana Torres', cupo: 20, inscritos: 20 },
      { nombre: 'Desarrollo Web con JS', instructor: 'Ing. María López', cupo: 25, inscritos: 10 },
    ];

    // ==========================================
    // SECCIÓN 1: ARREGLOS Y TABLA
    // ==========================================

    // Función para renderizar los datos en el <tbody> de la tabla
    function pintarTabla() {
        const tbody = document.querySelector('#tablas-talleres tbody');
        if (!tbody) return;

        tbody.innerHTML = ''; // Limpia la tabla antes de rellenar

        talleres.forEach((taller) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${taller.nombre}</td>
                <td>${taller.instructor}</td>
                <td>${taller.cupo}</td>
                <td>${taller.inscritos}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Dibujar la tabla al cargar la página
    pintarTabla();

    // Evento del formulario de arreglos
    const formArreglos = document.getElementById('form-arreglos');
    const resultadoArreglos = document.getElementById('resultado-arreglo');
    const selectOperacionArreglo = document.getElementById('operacion-arreglo');

    if (formArreglos) {
        formArreglos.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const operacion = selectOperacionArreglo.value;
            let resultado = '';

            switch (operacion) {
                case 'forEach':
                    // Genera lista simple de talleres
                    let lista = [];
                    talleres.forEach((t) => {
                        lista.push(`- ${t.nombre} (${t.inscritos}/${t.cupo})`);
                    });
                    resultado = lista.join('\n');
                    break;

                case 'map':
                    // Copia solo los nombres
                    const nombres = talleres.map((t) => t.nombre);
                    resultado = `Nombres:\n${JSON.stringify(nombres, null, 2)}`;
                    break;

                case 'filter':
                    // Talleres con cupo lleno (inscritos >= cupo)
                    const llenos = talleres.filter((t) => t.inscritos >= t.cupo);
                    resultado = `Talleres Llenos:\n${JSON.stringify(llenos, null, 2)}`;
                    break;

                case 'find':
                    // Buscar talleres impartidos por "Ing. María López"
                    const porInstructor = talleres.filter((t) => t.instructor === 'Ing. María López');
                    resultado = `Talleres de Ing. María López:\n${JSON.stringify(porInstructor, null, 2)}`;
                    break;
            }

            resultadoArreglos.textContent = resultado;
        });
    }

    // ==========================================
    // SECCIÓN 2: OBJETOS
    // ==========================================

    const btnEjecutarObjeto = document.getElementById('btn-ejecutar-objeto');
    const resultadoObjeto = document.getElementById('resultado-objeto');

    if (btnEjecutarObjeto) {
        btnEjecutarObjeto.addEventListener('click', () => {
            // Leer valores de las cajas de texto en tiempo real
            const taller = {
                nombre: document.getElementById('obj-nombre').value,
                instructor: document.getElementById('obj-instructor').value,
                cupo: Number(document.getElementById('obj-cupo').value),
                inscritos: Number(document.getElementById('obj-inscritos').value)
            };

            const operacion = document.getElementById('operacion-objeto').value;
            let salida = '';

            switch (operacion) {
                case 'keys':
                    salida = JSON.stringify(Object.keys(taller));
                    break;

                case 'values':
                    salida = JSON.stringify(Object.values(taller));
                    break;

                case 'entries':
                    let entradas = [];
                    for (const [campo, valor] of Object.entries(taller)) {
                        entradas.push(`${campo}: ${valor}`);
                    }
                    salida = entradas.join('\n');
                    break;

                case 'stringify':
                    salida = JSON.stringify(taller, null, 2);
                    break;

                case 'roundtrip':
                    const jsonString = JSON.stringify(taller);
                    const objetoDeVuelta = JSON.parse(jsonString);
                    salida = `Objeto recuperado:\nNombre: ${objetoDeVuelta.nombre}\nInstructor: ${objetoDeVuelta.instructor}`;
                    break;
            }

            resultadoObjeto.textContent = salida;
        });
    }
});