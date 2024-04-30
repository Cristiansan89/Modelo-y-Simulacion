/**
 * 
 * @param {*} a Nivel de significancia
 * @param {*} gl Grados de libertad
 * @param {*} m Cantidad de categorías
 * @param {*} fo Frecuencia observada
 * @param {*} fe Frecuencia esperada
 * @param {*} prob Probabilidad
 * @param {*} categorias Categorías del poker
 * @param {*} numeros Números generados aleatoriamente
 */


/* Función para obtener la frecuencia observada de cada categoría */
function contarTD(numeros, fo){
    let digitos = [];

    for (let i = 0; i < numeros.length; i++) {
        if(digitos.length == 3){
            if(digitos[0] != digitos[1] && digitos[0] != digitos[2] && digitos[1] != digitos[2]){
                fo[0] = (fo[0] + 1);
            }

            if(((digitos[0] == digitos[1] && digitos[0] != digitos[2]) || (digitos[0] == digitos[2] && digitos[0] != digitos[1]) || (digitos[1] == digitos[2] && digitos[1] != digitos[0]))){
                fo[1] = (fo[1] + 1); 
            }

            if(digitos[0] == digitos[1] && digitos[1] == digitos[2]){
                fo[2] = (fo[2] + 1)
            }

            digitos = [];
        }

        digitos = numeros[i].toString().split('');

        while (digitos.length < 3) {
            digitos.unshift('0');
        }
    }

    return fo;
}

function poker(prob, fo, fe){
    let frec_obs_total = fo[0] + fo[1] + fo[2];
    
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
//Hacemos un programa de 3 categorías
let m = 3;
let categorias = ['TD', '1P', 'T'];
let prob = [0.72, 0.27, 0.01];
let fo = [0, 0, 0];
let fe = [0, 0, 0];

let numeros = [113, 237, 348, 296, 80, 104, 784, 776, 936, 16, 272, 576, 432, 904, 224, 352, 640, 352, 224, 16, 880, 312] ;

console.log(contarTD(numeros,fo));
console.log(poker(prob, fo, fe))