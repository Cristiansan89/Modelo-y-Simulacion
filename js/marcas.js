/**
 * * calcula las marcas de clase con rangos minimos y maximos
 * @param {string} nombreGeneral nombre representativo de las marcas de clases
 * @param {array<string>} nombreMarcas array de nombres individuales de cada marca
 * @param {array<number>} pxMarcas probabilidad P(x) individual de cada marca
 * @param {number} valMin rango minimo de valores
 * @param {number} valMax rango maximo de valores
 * @returns {object}
 */
function obtenerMarcas(nombreGeneral, nombreMarcas, pxMarcas, valMin, valMax) {

    // * objeto inicial, sera una tabla de marcas de clase luego
    // TODO: ¿como trabajo un rango con valores min y max negativos?
    const marca = {
        nombreGeneral: nombreGeneral,
        nombreMarcas: [...nombreMarcas],
        pxMarcas: [...pxMarcas], //P(x)
        fxMarcas: [],
        valMin: valMin,
        valMax: valMax,
        valRango: Math.abs(valMax - valMin),
        min_max_porcentual: [], // minimos y maximos porcentuales
        min_max_digitos: [] // minimos y maximos en digitos
    };

    // * obtener frecuencia acumulada F(x)
    for (let i = 0; i < marca.pxMarcas.length; i++) {
        const element = marca.pxMarcas[i];
        (i === 0)
            ? marca.fxMarcas.push(element)
            : marca.fxMarcas.push(element + marca.fxMarcas[i - 1])
    };

    /**
     *  * crear rangos min. y max. porcentuales para cada marca individual
     *  busco lograr el siguiente formato:
     *  min_max_porcentual: [
     *  { nombreMarca: nombreMarcas[i-esima], min: 0                 , max: F(x)-iesimo},
     *  { nombreMarca: nombreMarcas[i-esima], min: F(x)-iesimo + 0.01, max: F(x)-iesimo},
     *  ...
     * ]
     */
    marca.min_max_porcentual = marca.fxMarcas.map((element, index) => {

        // capturo el nombre de cada marca de clase del objeto marca
        let nombreMarca = marca.nombreMarcas[index];
        // preparo el minimo y maximo de la marca
        let min, max;

        if (index === 0) {
            min = 0;
            max = element;
        } else {
            min = marca.fxMarcas[index - 1] + 0.01;
            max = element;
        }

        // retorno una marca de clase individual
        return { nombreMarca, min, max }
    });

    //* crear rangos min. y max. en digitos para cada marca individual

    // 1- array con cantidad de digitos por marca de clase
    const cantDigitos = marca.pxMarcas.map( px => Math.round(px * marca.valRango) );

    // 2- formato de array de rangos
    marca.min_max_digitos = cantDigitos.map( (cantDigito, index) => { 
        return {
            nombreMarca: nombreMarcas[index],
            cantDigitos: cantDigito,
            min: 0,
            max: 0
        } 
    } );

    // 3- calcular minimos y maximos por fila recursivamente
    let i = 0;
    function minMaxRecursivo(min, max, i) {
        if (i <= cantDigitos.length) {

            marca.min_max_digitos[i].min = min; // tomo minimo inicial y siguientes
            marca.min_max_digitos[i].max = max; // tomo maximo inicial y siguientes
            i++; // indicar siguiente recursividad
            
            if (i > 0 && i < cantDigitos.length - 1) {
                minMaxRecursivo(max + 1, max + 1 + cantDigitos[i], i);
            }

            if (i === cantDigitos.length - 1) {
                minMaxRecursivo(max + 1, marca.valMax, i);
            }
        };

        return;
    }
    // minimo y maximo inicial
    minMaxRecursivo(marca.valMin, marca.valMin + cantDigitos[i], i)

    return marca;
}
