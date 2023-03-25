

function calc_Agua(consumo, precos) {
    let resultado;
    switch (true) {
        case (consumo <= 10):
            resultado = precos[0] * 2;
            break;
        case (consumo > 10 && consumo <= 20):
            resultado = ((consumo - 10) * precos[1] + precos[0]) * 2;
            break;
        case (consumo > 20 && consumo <= 30):
            resultado = ((consumo - 20) * precos[2] + precos[0] + precos[1] * 10) * 2;
            break;
        case (consumo > 30 && consumo <= 50):
            resultado = ((consumo - 30) * precos[3] + precos[0] + precos[1] * 10 + precos[2] * 10) * 2;
            break;
        case (consumo > 50):
            resultado = ((consumo - 50) * precos[4] + precos[0] + precos[1] * 10 + precos[2] * 10 + precos[2] * 10 * 2) * 2;
            break;
        default:
            console.log('bosta');
            break;

    }
    return 'O valor aproximado a ser pago pelo consumo de <font color="#B5CEA8"> ' + consumo + 'm³</font> de água, é de <font color="#50C7FA"> ' + resultado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calc_Luz(arrForm, precos) {
    let nPrecos = [];
    let resultado;
    let adicBand;
    let tusd;
    let TE;
    let pisPasep;
    let cOFINS;
    let txMunicip = +arrForm.txmunicip;
    let multa = +arrForm.multa;
    let mora = +arrForm.mora;
    let outros = +arrForm.outros;

    precos.forEach(element => nPrecos.push(element / (1 - defICMS(+arrForm.consumo)))
    );
    if (defICMS(arrForm.consumo) == 0) {
        tusd = precos[0] * arrForm.consumo;
        TE = precos[1] * arrForm.consumo;
        if (arrForm.bandeira == 0) {
            adicBand = 0;
        } else {
            adicBand = precos[defBand(+arrForm.bandeira)] * +arrForm.consumo;
        }
    } else {
        tusd = nPrecos[0] * arrForm.consumo;
        TE = nPrecos[1] * arrForm.consumo;
        if (arrForm.bandeira == 0) {
            adicBand = 0;
        } else {
            adicBand = nPrecos[defBand(+arrForm.bandeira)] * +arrForm.consumo;
        }
    }
    pisPasep = (tusd + TE + adicBand) * (+arrForm.pispasep / 100);
    cOFINS = (tusd + TE + adicBand) * (+arrForm.cofins / 100);

    resultado = +(tusd + TE + adicBand + pisPasep + cOFINS + txMunicip + multa + mora + outros);

    return 'O valor aproximado a ser pago pelo consumo de <br> <font color="#B5CEA8"> ' + arrForm.consumo + ' kWh</font> é de: <br> <font color="#50C7FA"> ' + resultado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}


function defICMS(consumo) {
    switch (true) {
        case (consumo >= 0 && consumo <= 90):
            return 0;
            break;
        case (consumo > 90 && consumo <= 200):
            return 0.12;
            break;
        case (consumo > 200):
            return 0.25;
            break;

        default: return 0;
            break;
    }
}
function defBand(bandeira) {
    switch (bandeira) {
        case 1:
            return 2;
            break;
        case 2:
            return 3;
            break;
        case 3:
            return 4;
            break;
        case 4:
            return 5;
            break;

        default: return 0;
            break;
    }
}


global.calcAgua = calc_Agua;
global.calcLuz = calc_Luz;

module.exports = calcAgua;
module.exports = calcLuz;