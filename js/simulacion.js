/**
 * * CONSTANTES
 */
const STATUS_VENDIDO = "vendido";
const STATUS_INSATISFECHO = "insatisfecho";

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
        politica_pedidos: politica_pedidos,
        cantidad_proximo_pedido: [],
        pedido_en_transito: { 
            hayPedido: false,
            pedido: {
                demora: {},
                cantidad_pedido: 0 
            },
            contador_dias: 0 },
        historial_de_pedidos: [],
        dias: [],
    };

    // iterador del array de numeros aleatorios
    const iteradorDemanda = crearIteradorNumerosAleatorios(num_aleatorios);
    const iteradorDemora = crearIteradorNumerosAleatorios(num_aleatorios);

    // simular n dias
    for (let i = 1; i <= n_dias_simulacion; i++) {

        // crear un dia
        let dia = { 
            dia: `dia_${i}`,
            stock_inicial: 0,
            demanda: {},
            status: "",
            stock_final: 0,
            pedido: {
                hay_pedido_dia: false,
                detalle_pedido: {}
            },
            reposicion: {
                hay_reposicion_dia: false,
                detalle_reposicion: {}
            }
        };
        
        // dias restantes para la llegada del pedido
        if (simulacion.pedido_en_transito.hayPedido) {
            // pasan los dias
            if (simulacion.pedido_en_transito.contador_dias > 0) {
                simulacion.pedido_en_transito.contador_dias--;
            } else {

                // llega el pedido, repongo el stock antes de crear otro dia
                simulacion.stock_general += simulacion.pedido_en_transito.pedido.cantidad_pedido;
                // indicar la reposicion realizada en el dia
                let reposicion = { cantidad_repuesta: simulacion.pedido_en_transito.pedido.cantidad_pedido };
                dia.reposicion.hay_reposicion_dia = true;
                dia.reposicion.detalle_reposicion = reposicion;

                // no hay pedidos en transito a este punto
                simulacion.pedido_en_transito.hayPedido = false;
                simulacion.pedido_en_transito.pedido = {};
                simulacion.pedido_en_transito.contador_dias = 0;
            }
        }

        // stock al inicio del dia
        dia.stock_inicial = simulacion.stock_general;
        // demanda recibida en el dia
        dia.demanda = generarValorAjustado(marca_demanda, iteradorDemanda).next().value;

        // si tengo stock, vendo
        if((simulacion.stock_general - simulacion.stock_minimo) >= dia.demanda.cantidad) {
            // disminuye el stock
            simulacion.stock_general = simulacion.stock_general - dia.demanda.cantidad;
            dia.status = STATUS_VENDIDO;

            // guardar ultima demanda, ultimas segun politica de pedidos
            if (simulacion.cantidad_proximo_pedido.length < simulacion.politica_pedidos) {
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            } else {
                simulacion.cantidad_proximo_pedido.shift();
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            }

        } else {
            // no tengo stock
            dia.status = STATUS_INSATISFECHO;

            // guardar ultima demanda, ultimas segun politica de pedidos
            if (simulacion.cantidad_proximo_pedido.length < simulacion.politica_pedidos) {
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            } else {
                simulacion.cantidad_proximo_pedido.shift();
                simulacion.cantidad_proximo_pedido.push(dia.demanda.cantidad);
            }

            // hacer pedido
            if (!simulacion.pedido_en_transito.hayPedido) {
                
                let pedido = {};
                pedido.cantidad_pedido = simulacion.cantidad_proximo_pedido.reduce((suma, cantidad) => { return suma += cantidad });
                pedido.demora = generarValorAjustado(marca_demora, iteradorDemora).next().value;
                
                // la simulacion mantiene el pedido en transito 
                simulacion.pedido_en_transito.hayPedido = true;
                simulacion.pedido_en_transito.pedido = pedido;
                simulacion.pedido_en_transito.contador_dias = pedido.demora.cantidad;

                // el pedido realizado va al historial
                simulacion.historial_de_pedidos.push(pedido);

                // la cantidad del proximo pedido se reestablece a 0
                simulacion.cantidad_proximo_pedido = [];

                // indicar el pedido realizado en el dia
                dia.pedido.hay_pedido_dia = true;
                dia.pedido.detalle_pedido = pedido;

            }
        }
        
        // stock al final del dia, haya o no vendido
        dia.stock_final = simulacion.stock_general;
        
        // guardo el dia simulado
        simulacion.dias.push(dia);
    }

    return simulacion;
}
