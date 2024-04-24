/**
 * 
 * @param {*} v1 Valor 1
 * @param {*} v2 Valor 2
 * @param {*} k Semillas
 * @param {*} m Modulo
 * @param {*} a Constante
 * @param {*} c Constante
 * @param {*} i N° de iteraciones
 */

function aleatoriosCongruencia(v1, v2, k, m, a, c, i) {
    //Validamos que se cumplan las condiciones necesarias
    if (!(v1 > 0 && v2 > 0 && m > 0 && a > 0 && c > 0 && k >= 0)) {
        return "Los valores deben ser no negativos.";
    }

    if (!(Number.isInteger(v1) && Number.isInteger(m) && Number.isInteger(a) && Number.isInteger(c))) {
        return "Los valores deben enteros.";
    }

    if (!(v1 < m && v2 < m && m > a)) {
        return "El valor v1 y v2 debe ser menor a m y m debe ser mayor que a.";
    }

    //Declaramos el vector resultado de nuestra operación
    let v3 = (v1 * a + v2 * c) % m;
    let vectorResultado = [v1, v2, v3];

    for (let j = 2; j < i; j++) {
        let vi = (vectorResultado[j] * a + vectorResultado[j - k] * c) % m;
        vectorResultado.push(vi);
    }

    return vectorResultado;

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

//Declaramos las variables cy le asignamos valores correspondientes
let v1 = 113;
let v2 = 237;
let m = 1000;
let a = 4;
let c = 8;
let k = 2;
let i = 21;

//Llamamos a la función
console.log(descomponerEnDigitosES6(aleatoriosCongruencia(v1, v2, k, m, a, c, i)))