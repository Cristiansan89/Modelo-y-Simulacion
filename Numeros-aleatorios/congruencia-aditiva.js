/**
 * 
 * @param {*} v1 Array
 * @param {*} n Iteración
 * @param {*} m Modulo
 * @param {*} a Constante
 * @param {*} c Constante
 */
function aleatoriosCongruencia(v1, n, m, a, c){
    //Validamos que se cumplan las condiciones necesarias
    if(!(v1 > 0 && m > 0 && a > 0 && c > 0 && n >= 0)){
        console.log("Los valores deben ser no negativos.")
    }

    if(!(Number.isInteger(v1) && Number.isInteger(m) && Number.isInteger(a) && Number.isInteger(c))){
        console.log("Los valores deben enteros.");
    }

    if(!(v1 > m && m > a)){
        console.log("El valor v1 debe ser mayor a m y m debe ser mayor que a.");
    }else{
        return false
    }
}

let v1 = -1;
let m = 15;
let a = 4;
let c = 1;
let n = 1;
console.log(aleatoriosCongruencia(v1, n, m, a, c))