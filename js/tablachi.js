function tablachi(grado, probabilidad) {
    if (!(isNaN(grado) && isNaN(probabilidad))) {
        let chi2 = [], chi6 = [];
        chi2 = [13.8150, 11.982, 10.5965, 9.2104, 7.3778, 5.9915, 4.6052, 3.7942, 3.2189, 2.7726, 2.4079, 2.0996, 1.8326, 1.5970, 1.3863];
        chi6 = [22.4575, 20.2491, 18.5475, 16.8119, 14.4494, 12.5916, 10.6446, 9.4461, 8.5581, 7.8408, 7.2311, 6.6948, 6.2108, 5.7652, 5.3481];

        let valor = 0;

        if (grado === 2) {
            valor = chi2[probabilidad];

        } else if (grado === 6) {
            valor = chi6[probabilidad];
        }
        return valor;
    }
}