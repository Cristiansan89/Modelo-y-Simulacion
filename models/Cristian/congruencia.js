
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



function congruencia(v1, v2, k, m, a, c, i) {
    if (!(v1 >= 0 && a >= 0 && c >= 0)) {
        console.error("Error: Todos los valores deben ser mayores a 0");
        return;
    } else if (!(m > a) || !(m > 0)) {
        console.error("Error: m debe ser mayor que a y que 0.");
        return;
    } else {
        const resultado = [v1, v2];

        if (k >= resultado.length) {

        } else {
            console.error("Error: No se puede implementar la congruencia poeque k es muy grande!")
        }

        for (let x = 1; x < i; x++) {

            let v3 = (a * v1 + c * (v2 - 1)) % m;
            resultado.push(v3);
            let v4 = (a * v3 + c * v1) % m;
            resultado.push(v4);
            v1 = v4;
            v2 = v2 + 1;

        }
        return resultado;
    }

    //console.log("Resultados: [", resultado, "]");
}

const v1 = 113;
const v2 = 237;
const m = 1000;
const k = 2;
const a = 4;
const c = 8;
const i = 10;

console.log("conf: ", congruencia(v1, v2, k, m, a, c, i));
//console.log("Congruencia Fundamental: ", congruencia(v1, m, a, c, i));
