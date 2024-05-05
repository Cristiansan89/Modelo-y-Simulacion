function probabilidadChi(probabilidad) {
    if (!(isNaN(probabilidad))) {
        let valorProbabilidad = [0.001, 0.0025, 0.0005, 0.01, 0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
        return valorProbabilidad[probabilidad];
    }
}