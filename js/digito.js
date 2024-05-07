
function contarDigitos(pseudoaleatoria, numero) {
    let count = 0;
    for (let i = 0; i < pseudoaleatoria.length; i++) {
        if (pseudoaleatoria[i] === numero) {
            count++;
        }
    }
    return count;
}