// Función para comparar el segmento de cinco números
function compararSegmento(numeros) {
    // Contar la cantidad de cada número
    const conteo = {};
    for (const numero of numeros) {
        if (conteo[numero]) {
            conteo[numero]++;
        } else {
            conteo[numero] = 1;
        }
    }

    // Determinar la descripción de la combinación
    let descripcion;
    const valoresUnicos = Object.keys(conteo);
    const cantidadValoresUnicos = valoresUnicos.length;

    if (cantidadValoresUnicos === 5) {
        descripcion = "Todos son distintos";
    } else if (cantidadValoresUnicos === 4) {
        if (Object.values(conteo).includes(2)) {
            descripcion = "Un par";
        } else {
            descripcion = "Dos pares distintos";
        }
    } else if (cantidadValoresUnicos === 3) {
        if (Object.values(conteo).includes(3)) {
            descripcion = "Tercia";
        } else {
            descripcion = "Dos Par";
        }
    } else if (Object.values(conteo).includes(3) && Object.values(conteo).includes(2)) {
        descripcion = "Full";
    } else if (Object.values(conteo).includes(4)) {
        descripcion = "Poker";
    } else {
        descripcion = "Quintilla";
    }

    // Devolver la descripción y el conteo
    return descripcion;
}

// Ejemplo de uso
const numeros = [2, 2, 1, 2, 3];
const resultado = compararSegmento(numeros);
console.log(resultado);
console.log(`Conteo: ${JSON.stringify(resultado.conteo)}`);