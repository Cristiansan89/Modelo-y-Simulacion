/**
 * * calcula chi-cuadrado para una secuencia pseudoaleatoria
 * * para numeros NATURALES 0-9
 * @param {Number} pseudoAleatorios numeros pseudoaleatorios a comprobar
 * @returns [chi-cuadrada (x²), grados-de-libertad (v)]
 */
function obtenerChiCuadrado(pseudoAleatorios) {

    // digitos constantes
    const digitosNaturales = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // parametros de calculo
    const n = pseudoAleatorios.length;
    const k = digitosNaturales.length;
    const npi = n / k;


    // obtener fi
    const fi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < digitosNaturales.length; i++) {
        for (let j = 0; j < pseudoAleatorios.length; j++) {
            if (pseudoAleatorios[j] === digitosNaturales[i]) fi[i]++
        }
    }

    // obtener fi-npi
    const finpi = [];
    for (let i = 0; i < k; i++) {
        finpi.push((fi[i] - npi).toFixed(2));
    }

    // obtener (qi)²
    const qi = [];
    for (let i = 0; i < k; i++) {
        qi.push(Math.pow(fi[i] - npi, 2));
    }

     // obtener (qi)²/npi = (fi-npi)²/npi
     const x2 = [];
     for (let i = 0; i < k; i++) {
         x2.push(Math.pow(fi[i] - npi, 2) / npi);
     }

    // obtener chi-cuadrada calculada: sumatoria de los x2[i]
    const sumatoria = x2.reduce((suma, x2iesimo) => suma += x2iesimo, 0);

    // [[0-9],[fi, ...], npi, [finpi], [qi], [x2, ...], sumatoria]
    return [digitosNaturales, fi, npi, finpi, qi, x2, sumatoria];
}

/**
 * * comprueba si los numeros pseudoaleatorios pasan la prueba
 * * de chi-cuadrado para un p de 0.1, 0.05, o 0.025
 * * NOTA: Esta funcion podria ir en el frontend
 * @param {*} pseudoAleatorios array de digitos naturales a probar
 * @param {*} p probabilidad (ver tabla chi-cuadrado), por defecto p = 0.05
 */
function testChiCuadrado(pseudoAleatorios, p = '0.001') {

    // para los naturales, el grado de libertad (v) siempre es 9 (ver tabla chi-cuadrado)
    // accedo al valor usando objeto[p]
    const valoresTablaChiCuadrado = {
        '0.001': 27.8767,
        '0.0025': 25.4625,
        '0.005': 23.5893,
        '0.01': 21.6660,
        '0.025': 19.0228,
        '0.05': 16.9190,
        '0.1': 14.6837,
        '0.15': 13.2880,
        '0.2': 12.2421,
        '0.25': 11.3887,
        '0.3': 10.6564,
        '0.35': 10.0060,
        '0.4': 9.4136,
        '0.45': 8.8632,
        '0.5': 8.3428
    };

    // ejecutar test chi-cuadrado
    // resultado = [[0-9],[fi, ...], npi, [x2, ...], sumatoria]
    const resultado = [...obtenerChiCuadrado(pseudoAleatorios)]

    // conclusion del test
    let conclusion = (resultado[6] <= valoresTablaChiCuadrado[p]) ? ['PASA', '<='] : ['NO PASA', '>='];

    let mensajeConclusion = `La secuencia pseudoaleatoria ${conclusion[0]} el test siendo x² calculada: ${resultado[6].toFixed(5)} ${conclusion[1]} a x² de la tabla chi cuadrda: ${valoresTablaChiCuadrado[p]}, con 9 grados de libertad y alfa ${p}`;

    resultado.push(mensajeConclusion);

    // resultado = [[0-9],[fi, ...], npi, [finpi], [qi], [x2, ...], sumatoria, mensajeConclusion]
    resultado
    return resultado;
}