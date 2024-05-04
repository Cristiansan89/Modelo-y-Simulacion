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

    // Determinar la categoria de la combinación
    let categoria;
    const valoresUnicos = Object.keys(conteo);
    const cantidadValoresUnicos = valoresUnicos.length;

    if (cantidadValoresUnicos === 5) {
        categoria = "Todos Distintos";
    } else if (cantidadValoresUnicos === 4) {
        if (Object.values(conteo).includes(2)) {
            categoria = "Un Par";
        }
    } else if (cantidadValoresUnicos === 3) {
        if (Object.values(conteo).includes(3)) {
            categoria = "Tercia";
        } else {
            categoria = "Dos Par";
        }
    } else if (Object.values(conteo).includes(3) && Object.values(conteo).includes(2)) {
        categoria = "Full";
    } else if (Object.values(conteo).includes(4)) {
        categoria = "Poker";
    } else {
        categoria = "Quintilla";
    }

    return categoria;
}