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
 * * Para probar con quokka:
 * 1 - instalar el plugin en vsc
 * 2 - con este archivo js abierto presionar F1 para abrir la paleta de comandos y escribir "quokka toggle"
 * 3 - seleccionar la opcion "Quokka.js Toggle (Start/Stop) on Current File"
 * 4 - descomentar las lineas siguientes para ver las salidas
 */

// let pseudoaleatorios1 = pseudoAleatoriosFibonacci(23, 67, 50, 10);
// let pseudoaleatorios2 = pseudoAleatoriosFibonacci(17, 7, 177, 10);

// let test1 = descomponerEnDigitos(pseudoaleatorios1);
// let test2 = descomponerEnDigitosES6(pseudoaleatorios2);

// test1
// test2

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
 * @returns {Array<Number> | String} array de digitos pseudoaletorios o un string detallando un error.
 */
function nFibonacci(v1, v2, A, n) {

    // A debe ser mayor que v1 y v2
    if (!(A > v1 && A > v2)) {
        return 'ERROR: la constante de control debe ser mayor que las semillas para iniciar.';
    }

    let pseudoaleatorios = pseudoAleatoriosFibonacci(v1, v2, A, n);
    return descomponerEnDigitosES6(pseudoaleatorios);
}

/**
 * * Para node.js:
 * ejecutar por consola en la carpeta del script: node nFibonacci.js
 */
console.log(nFibonacci(37,77,90,10));
console.log(nFibonacci(37,77,6000,10000));