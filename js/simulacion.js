/**
 * * funcion iteradora.
 * a partir de un array de numeros aleatorios de entre 0 y 9,
 * captura de a 2 digitos (unidad y decena) para formar numeros de 0 a 99.
 * no destruye el array aleatorio original.
 * @returns {function}
 */
function crearIteradorNumerosAleatorios(aleatorios) {
    let i = 0;

    // clousure
    return function obtener() {
        let u = aleatorios[i].toString();
        let d = aleatorios[i+1].toString();
        i = i + 2;
        return Number(u+d);
    }
}

/**
 * * FUNCION ESPECIAL GENERADORA.
 * https://youtu.be/FR_bqrggDhA
 * 
 * toma un numero aleatorio entre (0,99) y:
 * - ajusta el valor a un intervalo maximo y minimo
 * - lo clasifica en una marca de clase el valor
 * retorna un objeto con la cantidad ajustada y su clasificacion
 * @returns {array<{cantidad: Number, clasificacion: String}>}
 */
function* generarValorAjustado(marca_clase, iterador) {
    
    // valor ajustado a una marca de clase
    let valor_ajustado = {};

    //* calculo de la cantidad
    //* uso como maximo de calculo el maximo de la ultima marca de clase.
    let aleatorio = iterador();
    valor_ajustado.cantidad = Math.round((aleatorio / 100 * (marca_clase.valMaxSup - marca_clase.valMin)) + marca_clase.valMin);

    //* clasificacion en una marca de clase
    marca_clase.min_max_digitos.forEach(marca_individual => {
        if (valor_ajustado.cantidad >= marca_individual.min && valor_ajustado.cantidad <= marca_individual.max) {
            valor_ajustado.clasificacion = marca_individual.nombreMarca;
        }
    })

    yield valor_ajustado;
};

/**
 *  * SIMULACION:
 * La simulacion deberia ser por dia
 * - cada dia hay una cantidad de demanda aleatoria, que genera una venta, que disminuye existencias
 * - con existencias al minimo, habra un dia que sea un "punto de pedido", donde se hará un pedido
 * - el pedido tiene una demora aleatoria
 * @param {*} min_inventario 
 * @param {*} max_inventario 
 * @param {*} politica_pedidos 
 * @param {*} n_dias_simulacion 
 * @param {*} marca_demanda 
 * @param {*} marca_demora 
 * @param {*} num_aleatorios 
 */
function simularExistencias(
    min_inventario, max_inventario, politica_pedidos,
    n_dias_simulacion, marca_demanda, marca_demora, num_aleatorios) {

    // objeto simulacion a retornar
    const simulacion = {
        stock_general: max_inventario,
        stock_minimo: min_inventario,
        politica_pedidos,
        cantidad_proximo_pedido: [],
        pedido_en_transito: { hayPedido: false, pedido: { demora: {}, cantidad_pedido: 0 }, contador_dias: 0 },
        historial_de_pedidos: [],
        dias: [],
    };

    //los numeros aleatorios, tomados de a 2, alcanzan para simular los n dias?
    let cantidad_digitos = num_aleatorios.length;
    let cantidad_posible = Math.floor(cantidad_digitos/2);
    if (cantidad_posible < n_dias_simulacion) {
        return simulacion.error = "ingrese mas numeros aleatorios para simular los dias solicitados";
    }

    // iterador del array de numeros aleatorios
    const iteradorDemanda = crearIteradorNumerosAleatorios(num_aleatorios);
    const iteradorDemora = crearIteradorNumerosAleatorios(num_aleatorios);

    // simular n dias
    for (let i = 1; i <= n_dias_simulacion; i++) {
        
        // dias restantes para la llegada del pedido
        if (simulacion.pedido_en_transito.hayPedido) {
            // pasan los dias
            if (simulacion.pedido_en_transito.contador_dias > 0) {
                simulacion.pedido_en_transito.contador_dias--;
            } else {
                // llega el pedido, repongo el stock antes de crear otro dia
                simulacion.stock_general += simulacion.pedido_en_transito.pedido.cantidad_pedido;
                // no hay pedidos en transito
                simulacion.pedido_en_transito.hayPedido = false;
                simulacion.pedido_en_transito.pedido = {};
                simulacion.pedido_en_transito.contador_dias = 0;
            }
        }

        // crear un dia
        let dia = { dia: `dia_${i}`, demanda: {}, status: "", stock: 0 };
        dia.demanda = generarValorAjustado(marca_demanda, iteradorDemanda).next().value;

        // si tengo stock, vendo
        if((simulacion.stock_general - dia.demanda.cantidad) > simulacion.stock_minimo) {
            simulacion.stock_general = simulacion.stock_general - dia.demanda.cantidad;
            dia.status = "vendido";
            // guardar ultima demanda, ultimas segun politica de pedido
            if (simulacion.cantidad_proximo_pedido.length < simulacion.politica_pedidos) {
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            } else {
                simulacion.cantidad_proximo_pedido.shift();
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            }
        } else {
            // no tengo stock
            dia.status = "insatisfecho";

            // guardar ultima demanda, ultimas segun politica de pedido
            if (simulacion.cantidad_proximo_pedido.length < simulacion.politica_pedidos) {
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            } else {
                simulacion.cantidad_proximo_pedido.shift();
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            }

            // hacer pedido
            if (!simulacion.pedido_en_transito.hayPedido) {
                let pedido = {};
                pedido.demora = generarValorAjustado(marca_demora, iteradorDemora).next().value;
                pedido.cantidad_pedido = simulacion.cantidad_proximo_pedido.reduce((suma, cantidad) => { return suma += cantidad });
                simulacion.pedido_en_transito.hayPedido = true;
                simulacion.pedido_en_transito.pedido = pedido;
                simulacion.pedido_en_transito.contador_dias = pedido.demora.cantidad;
                simulacion.historial_de_pedidos.push(pedido);
                simulacion.cantidad_proximo_pedido = [];
            }
        }
        
        // stock por dia
        dia.stock = simulacion.stock_general;
        
        // guardo el dia simulado
        simulacion.dias.push(dia);
    }

    return simulacion;
}

 // marcas de clase de prueba gneradas con marcas.js
 let demanda = {
    nombreGeneral: 'demanda',
    tipoMarca: '',
    nombreMarcas: [ 'a', 'b', 'c' ],
    pxMarcas: [ 0.5, 0.3, 0.2 ],
    fxMarcas: [ 0.5, 0.8, 1 ],
    valMin: 125,
    valMax: 175,
    valRango: 50,
    valMaxSup: 177,
    min_max_porcentual: [
        { nombreMarca: 'a', cantDigitosPorcentual: 50, min: 0, max: 0.5 },
        { nombreMarca: 'b', cantDigitosPorcentual: 30, min: 0.51, max: 0.8 },
        { nombreMarca: 'c', cantDigitosPorcentual: 20, min: 0.81, max: 1 }
    ],
    min_max_digitos: [
        { nombreMarca: 'a', cantDigitos: 25, min: 125, max: 150 },
        { nombreMarca: 'b', cantDigitos: 15, min: 151, max: 166 },
        { nombreMarca: 'c', cantDigitos: 10, min: 167, max: 177 }
    ]
};

let demora = { 
    nombreGeneral: 'demora',
    tipoMarca: '',
    nombreMarcas: [ 'a', 'b', 'c' ],
    pxMarcas: [ 0.4, 0.5, 0.1 ],
    fxMarcas: [ 0.4, 0.9, 1 ],
    valMin: 1,
    valMax: 15,
    valRango: 14,
    valMaxSup: 17,
    min_max_porcentual: [
        { nombreMarca: 'a', cantDigitosPorcentual: 40, min: 0, max: 0.4 },
        { nombreMarca: 'b', cantDigitosPorcentual: 50, min: 0.41, max: 0.9 },
        { nombreMarca: 'c', cantDigitosPorcentual: 10, min: 0.91, max: 1 }
    ],
    min_max_digitos: [
        { nombreMarca: 'a', cantDigitos: 6, min: 1, max: 7 },
        { nombreMarca: 'b', cantDigitos: 7, min: 8, max: 15 },
        { nombreMarca: 'c', cantDigitos: 1, min: 16, max: 17 }
    ]
};

// let aleatorios = [3, 3, 6, 5, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 8, 3, 4, 6, 5, 7, 6, 9, 9, 9, 7, 9, 2, 9, 7, 0, 8, 0, 4, 6, 8, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 6, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 4, 4, 0, 9, 8, 4, 8, 5, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7, 1, 9, 2, 4, 4, 0, 9, 8, 4, 8, 5, 8, 3, 4, 6, 5, 7, 6, 9, 9, 9, 7, 9, 2, 9, 7, 0, 8, 0, 4, 6, 8, 6, 1, 6, 9, 4, 5, 0, 9, 6, 1, 6, 9, 4, 6, 1, 6, 9, 4, 5, 0, 9, 3, 1, 5, 8, 9, 7, 8, 1, 4, 3, 6, 6, 2, 0, 6, 3, 8, 1, 2, 4, 7, 4, 2, 0, 0, 3, 8, 1, 5, 6, 2, 3, 0, 4, 2, 9, 2, 0, 5, 6, 6, 1, 4, 0, 9, 9, 0, 8, 3, 4, 1, 0, 3, 3, 4, 2, 8, 1, 1, 3, 3, 2, 2, 7, 4, 5, 8, 1, 1, 0, 3, 9, 2, 1, 7];

// let test = simularExistencias(300, 2000, 5, 60, demanda, demora, aleatorios);

// console.log(test);