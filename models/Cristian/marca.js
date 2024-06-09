
function obtenerMarcas(pseudoAleatorios) {

    // digitos constantes
    const digitosNaturales = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // parametros de calculo
    const n = pseudoAleatorios.length;
    const k = digitosNaturales.length;
    const min = Math.min(...digitosNaturales);
    const max = Math.max(...digitosNaturales);
    const valAbs = Math.abs(min - max);

    // obtener frecuencia absoluta
    const fa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < n; j++) {
            if (pseudoAleatorios[j] === digitosNaturales[i]) fa[i]++
        }
    }

    // obtener P(x)
    const px = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < k; i++) {
        px[i] = 1 / k;
    }

    // obtener F(x)
    const fx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    fx[0] = px[0];
    let factor = Math.pow(10, 1);
    for (let i = 1; i < k; i++) {
        let a = fx[i - 1] + px[i];
        fx[i] = Math.round(a * factor) / factor;
    }

    // cantidad elemento x marca de clase
    const cantMarca = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < k; i++) {
        cantMarca[i] = px[i] * valAbs;
    }

    // obtener las marcas de clases
    const intervalA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const intervalB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    intervalA[0] = 0;
    intervalB[0] = px[0];
    for (let i = 1; i < k; i++) {
        intervalA[i] = intervalB[i - 1];
        let interval = intervalA[i] + px[i];
        intervalB[i] = Math.round(interval * factor) / factor;
    }

    // obtener la frecuencia relativa
    const fr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let factorFx = Math.pow(10, 5);
    for (let i = 0; i < k; i++) {
        let frel = fa[i] / n;
        fr[i] = Math.round(frel * factorFx) / factorFx;
    }

    // obtener la frecuencia relativa
    const porcentaje = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let factorPorcien = Math.pow(10, 2);
    let sumatoriaPorcentaje = 0;
    for (let i = 0; i < fr.length; i++) {
        let porcien = fr[i] * 100;
        porcentaje[i] = Math.round(porcien * factorPorcien) / factorPorcien + "%";
        sumatoriaPorcentaje = Math.round(sumatoriaPorcentaje + porcien);
    }

    return [digitosNaturales, fa, px, fx, cantMarca, intervalA, intervalB, fr, porcentaje, sumatoriaPorcentaje, min, max, n];
}

function marcas(pseudoAleatorios) {

    const resultado = [...obtenerMarcas(pseudoAleatorios)]

    resultado
    return resultado;

}


<div>
    <select class="form-select" aria-label="Default select example"
        id="chiCuadrado">
        <option value="-1" selected>Seleccione la probabilidad
        </option>
        <option value="0.1">0,1</option>
        <option value="0.2">0,2</option>
        <option value="0.3">0,3</option>
        <option value="0.4">0,4</option>
        <option value="0.5">0,5</option>
        <option value="0.6">0,6</option>
        <option value="0.7">0,7</option>
        <option value="0.8">0,8</option>
        <option value="0.9">0,9</option>
    </select>
</div>

//marcas([2, 3, 7, 1, 7, 7, 4, 1, 4, 5, 9, 1, 2, 6, 0, 1, 0, 6, 3, 6, 6, 4, 7, 2, 9, 3, 5, 6, 5, 6, 5, 8, 4, 7, 8, 3, 9, 1, 1, 2, 4, 5, 1, 5, 6, 3, 9, 4, 0, 9, 3, 0, 3, 7, 1, 2, 2, 7, 0, 2, 3, 7, 5, 0, 7, 7, 4, 4, 5, 0, 6, 5, 0, 5, 2, 6, 6, 2, 6, 2, 9, 2, 3, 1, 8, 6, 1, 0, 1, 8, 3, 4, 8, 2, 3, 1, 2, 7, 9, 5, 1, 0, 4, 4, 5, 5, 4, 5, 9, 8, 4, 0, 7, 2, 6, 0, 6, 6, 7, 1, 8, 2, 1, 0, 4, 2, 8, 6, 3, 9, 0, 6, 7, 6, 3, 2, 1, 2, 5, 2, 5, 7, 3, 8, 0, 6, 5, 3, 7, 3, 3, 6, 4, 1, 6, 2, 9, 5, 2, 5, 4, 0, 9, 1, 8, 9, 5, 9, 8, 4, 2, 6, 4, 0, 6, 8, 2, 5, 7, 7, 5, 1, 4, 3, 4, 6, 1, 1, 5, 4, 6, 1, 5, 7, 6, 2, 9, 2, 1, 2, 3, 4, 1, 5, 5, 3, 8, 2, 0, 8, 1, 2, 0, 9, 2, 1, 0, 4, 1, 9, 6, 2, 9, 3, 0, 3, 1, 8, 7, 4, 9, 0, 6, 7, 7, 4, 2, 2, 3, 5, 4, 3, 1, 3, 8, 5, 4, 1, 6, 5, 6, 4, 7, 2, 5, 2, 8, 2, 5, 5, 3, 8, 2, 9, 3, 3, 3, 1, 6, 2, 4, 2, 1, 0, 8, 9, 2, 9, 9, 3, 8, 8, 6, 8, 7, 3, 3, 0, 2, 7, 2, 6, 0, 2]);