/**
 * * ABM de objetos en localstorage
 * se trata de un par clave => objeto, donde la clave es id unico (Y a su vez nombre del objeto),
 * y el objeto puede ser una secuencia de numeros pseudoaleatorios testeada o
 * una tabla de marcas de clase.
 * 
 * * formato del objeto secuencia numerica:
 * {
 *  nombre: "nombre representativo del objeto",
 *  tipo: "TIPO_SECUENCIA"
 *  algoritmo: "algoritmo usado",
 *  test_chi: [true | false, alfa],
 *  test_poker: [true | false, alfa],
 *  fecha_creacion: "date",
 *  cant_digitos: n,
 *  secuencia: []
 * }
 * 
 * * formato del objeto marca de clase:
 * TODO: describir la estructura de este objeto
 * {
 *  nombre: "nombre representativo del objeto",
 *  tipo: "TIPO_MARCA_CLASE",
 *  secuencia: "nombre de la secuencia a usar",
 *  minimo: numero,
 *  maximo: numero,
 *  fecha_creacion: "date",
 * }
 */

// * LOCAL STORAGE
const LST = window.localStorage;

// * para el tipo de retorno.
const OK = 0;
const ERROR = 1;

// * mensajes de retorno.
const MSJ_GUARDADO = "Objeto guardado!";
const MSJ_ERROR_NOMBRE = "Ya existe un objeto guardado con ese nombre!";
const MSJ_ERROR_BUSQUEDA = "El objeto buscado no existe!";
const MSJ_ELIMINADO = "Objeto eliminado!";

// * tipos de objetos permitidos.
const TIPO_SECUENCIA = "SEC";
const TIPO_MARCA_CLASE = "MC";

/**
 * * retorna el tipo adecuado si el objeto a crear es una secuencia numerica.
 * @returns tipo permitido para el objeto secuencia numerica
 */
function esSecuenciaNumerica() {
    return TIPO_SECUENCIA;
}

/**
 * * retorna el tipo adecuado si el objeto a crear es una marca de clase.
 * @returns tipo permitido para el objeto marca de clase
 */
function esMarcaDeClase() {
    return TIPO_MARCA_CLASE;
}

/**
 * * guardar objeto en localstorage.
 * NOTA: El nombre y la clave son el mismo string y debe ser unico
 * @param {string} clave string nombre del objeto a guardar
 * @param {object} objeto estructura de datos a guardar
 * @returns [1|0, "mensaje"]
 */
function guardarEnLocalStorage(clave, objeto) {

    // si ya existe un guardado con la misma clave
    if (LST.getItem(clave) !== null) {
        return [ERROR, MSJ_ERROR_NOMBRE];
    }

    // probar a guardar
    try {
        // puede generar error cuando se supera el espacio del local storage
        // puede generar error cuando el usuario tiene deshabilitado el local storage
        LST.setItem(clave, JSON.stringify(objeto));
    } catch (error) {
        return error.getMessage();
    }

    // guardado correcto
    return [OK, MSJ_GUARDADO];
}

/**
 * *obtener un objeto de localstorage.
 * NOTA: El nombre y la clave son el mismo string y debe ser unico
 * @param {string} clave string nombre del objeto a guardar
 * @returns {object} objeto guardado
 */
function obtenerDeLocalStorage(clave) {

    // obtener
    const objeto = LST.getItem(clave);

    // validacion
    if (objeto === null) {
        return [ERROR, MSJ_ERROR_BUSQUEDA];
    }

    // busqueda correcta
    return JSON.parse(objeto);
}

/**
 * * obtiene todos los objetos del local storage.
 * @param {string} tipo tipo de objeto buscado
 * @returns array de objetos
 */
function recuperarLocalStorage(tipo = "todos") {

    // array para secuencias obtenidas
    const stored = [];

    // si busco todos, retorno rapido
    if (tipo === "todos") {
        // recorrer por clave y obtener objetos
        for (const clave in LST) {
            if (Object.hasOwnProperty.call(LST, clave)) {
                const element = JSON.parse(LST[clave]);
                stored.push(element)
            }
        }

        // localstorage completo
        return stored;
    }

    // si busco por tipo
    for (const clave in LST) {
        if (Object.hasOwnProperty.call(LST, clave)) {
            // parse a objeto
            const element = JSON.parse(LST[clave]);
            // es del tipo buscado
            if (element.tipo === tipo) {
                stored.push(element);
            }
        }
    }

    // objetos encontrados
    return stored;
}

/**
 * * elimiar objeto del localstorage.
 * @param {string} clave clave del objeto a eliminar
 * @returns mensaje
 */
function eliminarDelLocalStorage(clave) {

    LST.removeItem(clave);
    return [OK, MSJ_ELIMINADO];
}