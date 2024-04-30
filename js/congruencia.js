/**
 * calcula n numeros pseudoaleatorios usando
 * el metodo de congruencias fundamental.
 * @param {Number} semillas array.
 * @param {Number} K pasos hacia atras.
 * @param {Number} A constante.
 * @param {Number} C constante.
 * @param {Number} M modulo.
 * @param {Number} n cantidad de numeros a generar.
 */
function aleatoriosCongruencia(semillas, K, A, C, M, n) {
    
    const pseudoaleatorios = [...semillas];
    let i = semillas.length - 1;

    // si K = 2, necesito hallar una tercer semilla.
    if(K === 2) {
        let v = ((pseudoaleatorios[1] * A + pseudoaleatorios[0] * C) % M);
        pseudoaleatorios.push(v);
        i++;
    }

    // si K > 2, itero normalmente.
    while (i <= n) {
        let v = ((pseudoaleatorios[i] * A + pseudoaleatorios[Math.abs(i-K)] * C) % M);
        pseudoaleatorios.push(v);
        i++;
    }

    return pseudoaleatorios;
}

/**
 * (ES6+) Recibe un array de numeros y los descompone
 * retornando un array de sus digitos.
 * ejemplo: [3, 14, 145] pasa a: [3, 1, 4, 1, 4, 5]
 * @param {*} arrayNumerico 
 * @returns array de digitos
 */
function descomponerEnDigitosES6(arrayNumerico) {
    let arrayDeDigitos = arrayNumerico.join('').split('').map(elem => Number.parseInt(elem));
    return arrayDeDigitos;
}

/**
 * 
 * @param {Number} semillas array.
 * @param {Number} K pasos hacia atras.
 * @param {Number} A constante.
 * @param {Number} C constante.
 * @param {Number} M modulo.
 * @param {Number} n cantidad de numeros a generar.
 * @returns {Array<Number>} array de digitos
 */
function nCongruencia(semillas, K, A, C, M, n) {
    let resultado = descomponerEnDigitosES6(aleatoriosCongruencia(semillas, K, A, C, M, n));
    return resultado;
}