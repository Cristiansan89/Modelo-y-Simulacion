/**
 * calcula n numeros pseudoaleatorios usando el
 * metodo de fibonacci.
 * consideraciones:
 * - asignar numeros primos a v1 y v2.
 * - la constante de control A debe ser mayor a v1 y v2.
 * @param {Number} v1 primer termino semilla.
 * @param {Number} v2 segundo termino semilla.
 * @param {Number} A constante de control.
 * @param {Number} n cantidad de iteraciones.
 * @returns array con n numeros pseudoaleatorios.
 */

function pseudoAleatoriosFibonacci(v1, v2, A, n) {

    let k, v3;
    // semillas iniciales
    let resultado = [v1, v2];

    for (let i = 0; i < n; i++) {
        // establecer el valor de k
        (v2 + v1 <= A) ? k = 0 : k = -1;
        // operar la formula de fibonacci
        v3 = (v2 + v1 + (k * A));
        // guardar numero pseudoaleatorio generado
        resultado.push(v3);
        // reasignar valores semilla
        v1 = v2;
        v2 = v3;
    }

    return resultado;
}

/**
 * (ES6+) Recibe un array de numeros y los descompone
 * retornando un array de sus digitos.
 * ejemplo: [3, 14, 145] pasa a: [3, 1, 4, 1, 4, 5]
 * @param {Number} arrayNumerico 
 * @returns array de digitos
 */
function descomponerEnDigitosES6(arrayNumerico) {
    let arrayDeDigitos = arrayNumerico.join('').split('').map(elem => Number.parseInt(elem));
    return arrayDeDigitos;
}

/**
 * * Funcion para ejecutar este algoritmo en node.js:
 * * Comprueba los parametros primero.
 * calcula n numeros pseudoaleatorios usando el
 * metodo de fibonacci.
 * consideraciones:
 * - asignar numeros primos a v1 y v2.
 * - la constante de control A debe ser mayor a v1 y v2.
 * @param {Number} v1 primer termino semilla.
 * @param {Number} v2 segundo termino semilla.
 * @param {Number} A constante de control.
 * @param {Number} n cantidad de iteraciones.
 * @returns array con n numeros pseudoaleatorios.
 */
function nFibonacci(v1, v2, A, n) {

    let pseudoaleatorios = pseudoAleatoriosFibonacci(v1, v2, A, n);
    let resultadoFibonacci = descomponerEnDigitosES6(pseudoaleatorios);
    return resultadoFibonacci;
}
