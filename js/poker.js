function hipotesisPoker(resultadoTest, chiCuadrado, metodo) {
    let resultado;
    let chi = chiCuadrado.toLocaleString(undefined, { minimumFractionDigits: 4 });
    let test = resultadoTest.toLocaleString(undefined, { minimumFractionDigits: 4 });

    if (resultadoTest > chiCuadrado) {
        resultado = "Se tiene " + test + " > " + chi + " en consecuencia, se aprueba la hipótesis de los números ordenados por el método " + metodo + ".";
    } else if (resultadoTest < chiCuadrado) {
        resultado = "Se tiene " + test + " < " + chi + " en consecuencia, se rechaza la hipótesis de los números ordenados por el método " + metodo + ".";
    } else {
        resultado = "Algo salió mal.";
    }
    return resultado;
}
