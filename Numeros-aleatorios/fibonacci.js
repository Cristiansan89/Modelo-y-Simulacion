/**
 * Consiste en:
    1. Elegir 3 (tres) parámetros (enteros no negativos de 3 a 7
    dígitos): V 1 , V 2 y A, que se asignan como valores del
    primer y segundo términos de la serie y de un parámetro de
    control, respectivamente.
    2. Aplicar: V 3 = V 2 + V 1 + k A, donde k es un parámetro real y
    entero que se define como:
        * 0 si V 2 + V 1 <= A
        * -1 en otro caso
    3. Asignar V 3 a V 2 , y V 2 a V 1 .
    4. Repetir los pasos del 2 al 3 n veces, siendo n la cantidad de
    nros pseudoaleatorios a generar.
 */

/**
 * calcula n numeros pseudoaleatorios usando el
 * metodo de fibonacci.
 * @param v1 primer termino semilla.
 * @param v2 segundo termino semilla.
 * @param A constante de control.
 * @param n cantidad de iteraciones.
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
 * Recibe un array de numeros y los descompone
 * retornando un array de sus digitos.
 * ejemplo: [3, 14, 145] pasa a: [3, 1, 4, 1, 4, 5]
 * @param {*} arrayNumerico 
 * @returns array de digitos
 */
function descomponerEnDigitos(arrayNumerico) {
    // resultado final a retornar
    let arrayFinal = [];

    arrayNumerico.forEach(numero => {
        // descompone un numero en un array de caracteres
        // ejemplo: 34 lo convierte a ['3', '4']
        let arrayDeCaracteres = numero.toString().split('');
        // cada caracter lo envia al array final, como un numero
        arrayDeCaracteres.forEach(caracter => {
            arrayFinal.push(parseInt(caracter, 10));
        })
    })

    return arrayFinal;
}

/**
 * (ES6+) Recibe un array de numeros y los descompone
 * retornando un array de sus digitos.
 * ejemplo: [3, 14, 145] pasa a: [3, 1, 4, 1, 4, 5]
 * @param {*} arrayNumerico 
 * @returns array de digitos
 */
function descomponerEnDigitosES6(arrayNumerico) {
    return arrayNumerico.map(numero => {
        // cada numero es un array de caracteres
        let arrayDeCaracteres = numero.toString().split('');
        // cada array de caracteres se transforma en un array de digitos
        let arrayDeDigitos = arrayDeCaracteres.map(caracter => parseInt(caracter, 10));
        // retornamos el array de digitos para flat()
        return arrayDeDigitos;
    }).flat();
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
 * calcula n numeros pseudoaleatorios usando el
 * metodo de fibonacci.
 * @param v1 primer termino semilla.
 * @param v2 segundo termino semilla.
 * @param A constante de control.
 * @param n cantidad de iteraciones.
 * @returns array con n numeros pseudoaleatorios.
 * 
 */
function nFibonacci(v1, v2, A, n) {
    let pseudoaleatorios = pseudoAleatoriosFibonacci(v1, v2, A, n);
    return descomponerEnDigitosES6(pseudoaleatorios);
}

/**
 * * Para node.js:
 * ejecutar por consola en la carpeta del script: node fibonacci.js
 */
console.log(nFibonacci(37,77,7,10));