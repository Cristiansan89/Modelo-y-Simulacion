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

    // obtener (qi)²/npi = (fi-npi)²/npi
    const x2 = [];
    for (let i = 0; i < k; i++) {
        x2.push(Math.pow(fi[i] - npi, 2) / npi);
    }

    // obtener chi-cuadrada calculada: sumatoria de los x2[i]
    const chiCalculada = x2.reduce((suma, x2iesimo) => suma += x2iesimo, 0);

    // [chi-cuadrada (x²), grados-de-libertad (v)]
    return [chiCalculada, k - 1];
}

/**
 * * comprueba si los numeros pseudoaleatorios pasan la prueba
 * * de chi-cuadrado para un p de 0.1, 0.05, o 0.025
 * * NOTA: Esta funcion podria ir en el frontend
 * @param {*} pseudoAleatorios array de digitos naturales a probar
 * @param {*} p probabilidad (ver tabla chi-cuadrado), por defecto p = 0.05
 */
function testChiCuadrado(pseudoAleatorios, p = '0.05') {

    // para los naturales, el grado de libertad (v) siempre es 9 (ver tabla chi-cuadrado)
    // accedo al valor usando objeto[p]
    const valoresTablaChiCuadrado = {
        '0.025': 19.0228,
        '0.05': 16.9190,
        '0.1': 14.6837
    };

    // ejecutar test chi-cuadrado
    // rsultado = [chi-cuadrada (x²), grados-de-libertad (v)]
    const resultado = [...obtenerChiCuadrado(pseudoAleatorios)]

    // conclusion del test
    let conclusion = (resultado[0] <= valoresTablaChiCuadrado[p]) ? ['PASA', '<='] : ['NO PASA', '>='];

    return `La secuencia pseudoaleatoria ${conclusion[0]} el test siendo x² calculada: ${resultado[0]} ${conclusion[1]} a x² de tabla: ${valoresTablaChiCuadrado[p]}, con ${resultado[1]} grados de libertad`;
}

// *PRUEBAS
// secuencia de pruebas
let test = [1, 2, 3, 4, 5, 6, 3, 2, 1, 4, 5, 6, 1, 1, 9, 5, 4, 0, 1, 5, 6, 4, 7, 8, 4, 5, 2, 8, 7, 9, 1, 0];

console.log(testChiCuadrado(test));
console.log(testChiCuadrado(test, '0.1'));
console.log(testChiCuadrado(test, '0.025'));