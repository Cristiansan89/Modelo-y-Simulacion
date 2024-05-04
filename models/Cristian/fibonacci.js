/**
 * 
 * @param {*} v1 Semilla inicial
 * @param {*} v2 La segunda semilla 
 * @param {*} A Parametro de control
 * @param {*} n Número pseudoaleatorio 
 */
function fibonacci(v1, v2, A, n) {
    const resultado = [];

    for (let i = 0; i < n; i++) { // Condición propuesto por fibonacci
        let k = 0;
        if (v1 + v2 <= A) {
            k = 0;
        } else {
            k = -1;
        }

        // Calcular el siguiente termino --> v3
        const v3 = v2 + v1 + (k * A);
        resultado.push(v3);

        v1 = v2;
        v2 = v3;
    }

    return resultado;
}

function isPrimo(n) {
    if (n <= 1) {
        return false;
    } else if (n <= 3) {
        return true;
    } else if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }

    let i = 5;
    for (; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
/*
const v1 = 313;
const v2 = 797;
const A = 929;
const n = 10;
*/

const v1 = 23;
const v2 = 67;
const A = 17;
const n = 10;


if (isPrimo(v1) && isPrimo(v2) && isPrimo(A)) {
    const randomNumbers = fibonacci(v1, v2, A, n);
    console.error("Generando números pseudo-random: ", randomNumbers);
    const separarComaNumbers = randomNumbers.join('');

    const numberSeparado = separarComaNumbers.split('');

    console.log("Generando fibo(): (", numberSeparado.join(', '), ")");
} else {
    console.error("La semilla inicial no es un número primo.");
}




