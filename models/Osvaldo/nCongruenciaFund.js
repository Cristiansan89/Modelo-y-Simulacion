/**
 * calcula n numeros pseudoaleatorios usando
 * el metodo de congruencias fundamental.
 * * TOMA K DINAMICO.
 * @param {Number} semillas array.
 * @param {Number} A constante.
 * @param {Number} C constante.
 * @param {Number} M modulo.
 * @param {Number} n cantidad de numeros a generar.
 */
function pseudoAleatoriosCF(semillas, A, C, M, n) {

    const K = semillas.length; //k cantidad de semillas iniciales
    const pseudoaleatorios = [...semillas];
    let i = K - 1;

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
};

/**
 * (ES6+) Recibe un array de numeros y los descompone
 * retornando un array de sus digitos.
 * ejemplo: [3, 14, 145] pasa a: [3, 1, 4, 1, 4, 5]
 * @param {*} arrayNumerico a descomponer.
 * @returns array de digitos.
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

// let pseudoaleatorios1 = pseudoAleatoriosCF([113, 237], 4, 8, 1000, 100);
// let pseudoaleatorios2 = pseudoAleatoriosCF([113, 237, 18], 4, 8, 2000, 10);

// let test1 = descomponerEnDigitosES6(pseudoaleatorios1);
// let test2 = descomponerEnDigitosES6(pseudoaleatorios2);

// test1
// test2

/**
 * * funcion para ejecutar este algoritmo en node.js:
 * * comprueba los parametros primero.
 * calcula n numeros pseudoaleatorios usando
 * el metodo de congruencias fundamental.
 * @param {Number} semillas array.
 * @param {Number} A constante.
 * @param {Number} C constante.
 * @param {Number} M modulo.
 * @param {Number} n cantidad de numeros a generar.
 * @returns {Array<Number> | String} array de digitos pseudoaletorios o un string detallando un error.
 */
function nCongrFund(semillas, A, C, M, n) {

    // las semillas, A, C, M, n, deben ser enteros no negativos.
    let args = [...semillas, A, C, M, n];
    for (let i = 0; i < args.length; i++) {
        if(!(Number.isInteger(args[i]) && args[i] > 0)) {
            return 'ERROR: los parametros deben ser enteros no negativos para iniciar.'
        };
    }

    // M > semillas[i]
    for (let i = 0; i < semillas.length; i++) {
        if(!(M > semillas[i])) {
            return 'ERROR: el valor M debe ser superior a cada semilla para iniciar.';
        }
    }

    // si semillas.length < 2 ERROR, necesito al menos 2 semillas.
    if(semillas.length < 2) {
        return 'ERROR: se necesitan minimo 2 semillas para iniciar.';
    }
    
    // M > A
    if (!(M > A)) {
        return 'ERROR: M debe ser mayor que A para iniciar.'
    }

    let aux = pseudoAleatoriosCF(semillas, A, C, M, n);
    return descomponerEnDigitosES6(aux);
}

/**
 * * para node.js:
 * ejecutar por consola en la carpeta del script: node nCongrFund.js
 */
console.log(nCongrFund([113, 237], 4, 8, 1000, 10));
console.log(nCongrFund([177, 33, 'b'], 17, 45, 2000, 15));
