/**
 * 
 * @param {*} a Nivel de significancia (0.05)
 * @param {*} gl Grados de libertad - cant categorias-1
 * @param {*} fo Frecuencia observada
 * @param {*} fe Frecuencia esperada
 * @param {*} prob Probabilidad
 * @param {*} categorias Categorías del poker
 * @param {*} numeros Números generados aleatoriamente
 * @param {*} m Cantidad de dígitos a evaluar (5)
 */


/* Función para obtener la frecuencia observada de cada categoría */
function contarDigitos(numeros, fo, m){
    let digitos = [];
    for (let i = 0; i < numeros.length; i++) {
        if(digitos.length == m){
            let count = {};
            digitos.forEach(digito => {
                count[digito] = (count[digito] || 0) + 1;
            });

            let valores = Object.values(count);
            let unicos = valores.length;

            if (unicos === 5) {
                // Todos distintos
                fo[0]++;
            } else if (unicos === 4) {
                // 1 par
                fo[1]++;
            } else if (unicos === 3) {
                // 2 pares o tercia
                if (valores.some(val => val === 3)) {
                    // tercia
                    fo[3]++;
                } else {
                    // 2 pares
                    fo[2]++;
                }
            } else if (unicos === 2) {
                // Full o Poker
                if (valores.some(val => val === 4)) {
                    // Poker
                    fo[5]++;
                } else {
                    // Full
                    fo[4]++;
                }
            } else if (unicos === 1) {
                // Quintilla
                fo[6]++;
            }

            digitos.shift();
        }
        digitos.push(numeros[i]);
    }

    return fo;
}

function poker(prob, fo, fe){
    let a = 0.05;
    let frec_obs_total = 0;

    for(i=0; i < fo.length; i++){
        frec_obs_total += fo[i];
    }
    
    //Calculamos la frecuencia esperada de cada categoría
    for (let i = 0; i < fe.length; i++) {
        fe[i] = prob[i] * frec_obs_total;
    }

    //Calculamos x² de cada categoría
    let chi_individual = [0, 0, 0];
    for (let i = 0; i < chi_individual.length; i++) {
        chi_individual[i] = ((fe[i] - fo[i])**2)/fe[i];
    }

    //Calculamos x² total
    let chi_total = chi_individual[0] + chi_individual[1] + chi_individual[2];

    return chi_total;
}


//Datos necesarios
//Hacemos un programa de 5 dígitos
let m = 5;
let categorias = ['TD', '1P', '2P', 'T', 'F', 'P', 'Q'];
let prob = [0.3024, 0.5040, 0.1080, 0.0720, 0.0090, 0.0045, 0.0001];
let fo = [0, 0, 0, 0, 0, 0, 0];
let fe = [0, 0, 0, 0, 0, 0, 0];

let numeros = [1, 1, 3, 2, 3, 7, 3, 4, 8, 2, 9, 6, 8, 0, 1, 0, 4, 7, 8, 4, 7, 7, 6, 9, 3, 6, 1, 6, 2, 7, 2, 5, 7, 6, 4, 3, 2, 9, 0, 4, 2, 2, 4, 3, 5, 2, 6, 4, 0, 3, 5, 2, 2, 2, 4, 1, 6, 8, 8, 0, 3, 1, 2];
console.log(numeros.length);
let gl = categorias.length - 1;

console.log(contarDigitos(numeros,fo,m));
console.log(poker(prob, fo, fe))

