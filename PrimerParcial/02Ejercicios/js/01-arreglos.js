// 01-arreglos.js
// Métodos de arreglo más usados en JS/Node — practícalos sobre esta lista
// de talleres (misma forma que la API real de CECyT9). Completa cada TODO.

const formObjeto = document.getElementById('form-objeto');
const resultadoObjeto = document.getElementById('resultado-objeto');

formObjeto.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const taller = {
        nombre : document.getElementById('obj-nombre').value,
        instructor : document.getElementById('obj-instructor').value,
        cupo : Number(document.getElementById('obj-cupo').value),
        inscritos : Number(document.getElementById('obj-inscritos').value)
    };

    const operacion = document.getElementById('operacion-objeto').value;

    let resultado;
    
    switch(operacion){
        case 'keys':
            resultado = JSON.stringify(Object.keys(taller));
            break;

        case 'values':
            resultado = JSON.stringify(Object.values(taller));
            break;

        case 'entries':
            resultado = JSON.stringify(Object.entries(taller));
            break;

        case 'stringify':
            const textoJson = JSON.stringify(taller, null, 2);
            resultado = `${textoJson}\n\ntipo: ${typeof textoJson}`;
            break;

        case 'roundtrip':
            const jsonString = JSON.stringify(taller);
            const objetoReconstruido = JSON.parse(jsonString);

            resultado = `JSON String: ${jsonString}\n\nObjeto deserializado: ${objetoReconstruido.nombre} (Instructor: ${objetoReconstruido.instructor})`;
            break;

        default:
            resultado = 'Operación no válida';
    }

    resultadoObjeto.textContent = resultado;
});
// TODO: find — encuentra el PRIMER taller impartido por 'Ing. María López'

// TODO: reduce — calcula `totalInscritos`, la suma de inscritos de todos los talleres

// TODO: filter + map encadenados — nombres de los talleres que SÍ tienen cupo disponible
