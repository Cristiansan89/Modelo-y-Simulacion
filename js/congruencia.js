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

function aleatoriosCongruencia(semillas, k, m, a, c, i) {
    let semilla = [...semillas];
    let cantSemilla = semilla.length;
    let n = k - 1;

    for (let j = 0; j <= cantSemilla; j++) {
        if (semilla[j] < 0) {
            return "El valor de la semilla [", j, "] debe ser no negativo.";
        }
    }

    for (let j = 0; j <= cantSemilla; j++) {
        if (Number.isInteger(semilla[j] > 0)) {
            return "El valor de la semilla [", j, "] debe ser entero.";
        }
    }

    if (m < 0) {
        return "El valor 'm' deben ser no negativos.";
    }

    if (a < 0) {
        return "El valor 'a' deben ser no negativos.";
    }

    if (c < 0) {
        return "El valor 'c' deben ser no negativos.";
    }

    if (k <= 0) {
        return "El valor 'k' deben ser no negativos.";
    }

    if (!(Number.isInteger(m) && Number.isInteger(a) && Number.isInteger(c))) {
        return "El valor 'm' debe se entero.";
    }

    if (m > a) {
        for (let j = 0; j <= cantSemilla; j++) {
            if (semilla[j] > m) {
                return "Los valores de la 'semilla' deber ser menor a 'm'";
            }
        }
    } else {
        return "El valor de 'm' debe ser mayor a 'a'.";
    }

    semilla[cantSemilla] = ((semilla[cantSemilla - 2] * a + semilla[cantSemilla - 1] * c) % m);
    for (let j = cantSemilla; j < i; j++) {
        let seed = (semilla[j] * a + semilla[j - k] * c) % m;
        semilla.push(seed);
    }

    return semilla;
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


function nCongruencia(semillas, k, m, a, c, i) {
    let resultado = descomponerEnDigitosES6(aleatoriosCongruencia(semillas, k, m, a, c, i));
    return resultado;
}


//Declaramos las variables cy le asignamos valores correspondientes
/*let semillas = [113, 237];
let v1 = 113;
let v2 = 237;
let m = 1000;
let a = 4;
let c = 8;
let k = 2;
let i = 21;

//Llamamos a la función
console.log(nCongruencia(semillas, k, m, a, c, i));*/