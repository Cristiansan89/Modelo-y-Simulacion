
/**
 * 
 * @param {*} v1 
 * @param {*} v2 
 * @param {*} k 
 * @param {*} m 
 * @param {*} a 
 * @param {*} c 
 * @param {*} i 
 */



function congruencia(v1, m, a, c, i) {
    if (!(v1 > 0 && m > 0 && a > 0 && c > 0)) {
        console.error("Error: Todos los valores deben ser mayores a 0");
        return;
    } else if (!(m > a)) {
        console.error("Error: m debe ser mayor que a.");
        return;
    } else {
        const resultado = [];
        let v2 = (a * v1 + c) % m;
        resultado.push(v2);
        for (let x = 1; x < i; x++) {
            v3 = (a * v2 + c) % m;
            resultado.push(v3);
            v1 = v2;
            v2 = v3;
        }
        return resultado;
    }

    //console.log("Resultados: [", resultado, "]");
}

const v1 = 117;
const m = 1000;
const a = 4;
const c = 8;
const i = 15;

console.log("conf: ", congruencia(v1, m, a, c, i));
