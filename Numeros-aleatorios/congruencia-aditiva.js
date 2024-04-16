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

function aleatoriosCongruencia(v1, v2, k, m, a, c, i){
    //Validamos que se cumplan las condiciones necesarias
    if(!(v1 > 0 && v2 > 0 && m > 0 && a > 0 && c > 0 && k >= 0)){
        return "Los valores deben ser no negativos.";
    }

    if(!(Number.isInteger(v1) && Number.isInteger(m) && Number.isInteger(a) && Number.isInteger(c))){
        return "Los valores deben enteros.";
    }

    if(!(v1 < m && v2 < m && m > a)){
        return "El valor v1 y v2 debe ser menor a m y m debe ser mayor que a.";
    }

    //Declaramos el vector resultado de nuestra operación
    let vectorResultado = [v1,v2];

    for(let j = 2; j < i; j++){
        let vi = (vectorResultado[j-1] * a + vectorResultado[j-2] * c) % m;
        vectorResultado.push(vi); 
    }

    return vectorResultado;

}

//Declaramos las variables cy le asignamos valores correspondientes
let v1 = 117;
let v2 = 237;
let m = 1000;
let a = 4;
let c = 8;
let k = 2;
let i = 15;

//Llamamos a la función
console.log(aleatoriosCongruencia(v1, v2, k, m, a, c, i))