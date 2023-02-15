import { IDTOCotizacion } from "../interfaces/cotizacionInterfaces"

export const doCotizacion = (cot: IDTOCotizacion) => {
    const {
        cliente,
        enAtenciónA,
        tipoCliente,
        promotor,
        correo,
        telefono,
        tipoActivo,
        cantidadUnidades,
        marca,
        modelo,
        version,
        estado,
        precioActivo,
        plazo,
        comisionApertura,
        anticipoArrendamiento,
        plan,
        tipoSeguro,
        costoSeguro,
        rentasDeposito,
        tipoResidual,
        fondoReserva,
        valorResidualConvenido,
        accesorio
    } = cot

    const tablaResidual = [{
        id:0,
        plazo:12,
        minimo:5,
        maximo:50
    },{
        id:1,
        plazo:24,
        minimo:5,
        maximo:40
    },{
        id:2,
        plazo:36,
        minimo:5,
        maximo:35
    },{
        id:3,
        plazo:48,
        minimo:5,
        maximo:25
    }]

    const tablaOtrosGastos = [{
        id:0,
        plazo:12,
        instalacion:1000,
        gpsAnual:4300,
        gastosNotariales:4500,
        total:9800
    },{
        id:1,
        plazo:24,
        instalacion:1000,
        gpsAnual:8600,
        gastosNotariales:4500,
        total:14100
    },{
        id:2,
        plazo:36,
        instalacion:1000,
        gpsAnual:12900,
        gastosNotariales:4500,
        total:18400
    },{
        id:3,
        plazo:48,
        instalacion:1000,
        gpsAnual:17200,
        gastosNotariales:4500,
        total:22700
    }]

    const tablaCamposEditables = [{
        id:0,
        campo:'Porcentaje maximo (pago inicial)',
        valor:45,
        tipo:''
    },{
        id:1,
        campo:'Descuento mensual por rentas',
        valor:10,
        tipo:'Anual'
    },{
        id:2,
        campo:'Valor residual bicicletas',
        valor:5,
        tipo:''
    }]

    const tablaTasas = [{
        id:0,
        plazo:12,
        planA:32,
        planB:33,
        alfa:34,
        beta:35,
        gamma:36
    },{
        id:1,
        plazo:24,
        planA:32,
        planB:33,
        alfa:34,
        beta:35,
        gamma:36
    },{
        id:2,
        plazo:36,
        planA:32,
        planB:33,
        alfa:34,
        beta:35,
        gamma:36
    },{
        id:3,
        plazo:48,
        planA:32,
        planB:33,
        alfa:34,
        beta:35,
        gamma:36
    }]

    // No existe un error como tal, es de typescript por el tipado
    // console.log('Accesorio:', accesorio.length)
    const sumaa = accesorio.reduce((sum, acc) => (sum + acc.valorAccesorio), 0)
    // console.log('La suma es:', sumaaa)


    const resultados = {
        valorResidualSinIva: 0,
        valorInicialArrendamiento: 0,
        // montoArrendamiento: 0,
        montoArrendamientoFinal: 0,
        rentaMensual: 0,
        comision:0
    }

    // console.log('En Cotiza, el valor factura:', precioActivo)
    let vFSInIVA = precioActivo / 1.16
    let valorResidualSinIva = 0 
    if(tipoResidual==='Porcentaje'){
        let valorResidual = vFSInIVA * (valorResidualConvenido / 100)
        valorResidualSinIva = valorResidual / 1.16
    }else if( tipoResidual ==='Cantidad' ){
        valorResidualSinIva = valorResidualConvenido / 1.16
    }
    resultados.valorResidualSinIva = valorResidualSinIva
    console.log('valor residual', valorResidualSinIva)
    let otrosGastos = 0
    if (plazo == 12) {
        otrosGastos = 9800
    } else if (plazo >= 13 && plazo <= 24) {
        otrosGastos = 14100
    } else if (plazo >= 25 && plazo <= 35) {
        otrosGastos = 18400
    } else if (plazo >= 36 && plazo <= 48) {
        otrosGastos = 22700
    }
    // Monto de arrendamiento  = Valor factura + Accesorios + Otros gastos (con IVA) – Valor inicial del arrendamiento + Comisión por apertura con IVA
    // Valor inicial del arrendamiento = Total pago inicial, - Seguro anual con IVA, -  Rentas en depósito con IVA

    // console.log('Anticipo: ', anticipoArrendamiento)
    // console.log('Rentas en depósito: ', rentasDeposito)
    // console.log('Seguro anual: ', costoSeguro)
    let valorInicialArrendamiento = anticipoArrendamiento
    let ValorInicialArr = rentasDeposito + costoSeguro
    if(valorInicialArrendamiento>0){
        valorInicialArrendamiento = ValorInicialArr - valorInicialArrendamiento
    }
    // if (rentasDeposito > 0) {
    //     valorInicialArrendamiento -= rentasDeposito
    // }
    // if (costoSeguro > 0) {
    //     valorInicialArrendamiento -= costoSeguro
    // }
    resultados.valorInicialArrendamiento = valorInicialArrendamiento
    console.log('Aquí esta el valor inicial del arrendamiento', valorInicialArrendamiento)

    let montoArrendamiento = precioActivo + sumaa + (otrosGastos * 1.16) - anticipoArrendamiento
    // resultados.montoArrendamiento = montoArrendamiento
    // let montoArrendamiento = precioActivo + parseFloat(valorAccesorios.value) + (otrosGastos * 1.16) - valorInicialArrendamiento

    console.log('Monto Arrendamiento: ', montoArrendamiento)
    let comisionAp = montoArrendamiento * comisionApertura / 100
    // console.log('Comisión Con IVA', comisionAp)
    let comisionApSinIva = comisionAp / 1.16
    console.log('Comision: ', comisionApSinIva)
    resultados.comision=comisionApSinIva
    let montoArrendamientoFinal = montoArrendamiento + comisionAp
    // console.log('Arrendamiento final', montoArrendamientoFinal)
    let montoArrendamientoFinalSinIva = montoArrendamientoFinal / 1.16
    console.log('Arrendamiento Sin iva', montoArrendamientoFinalSinIva)
    resultados.montoArrendamientoFinal = montoArrendamientoFinalSinIva

    const PMT = (tipm: number, nper: number, pv: number, fv: number, type: number) => {
        
        
        // tipm   - Tasa de interés por mes
        // nper   - numero de periodos
        // pv     - valor presente
        // fv     - valor futuro
        // type   - Cuando vencen los pagos

        let pmt, pvif;

        fv || (fv = 0);
        type || (type = 0);

        if (tipm === 0)
            return -(pv + fv) / nper;

        pvif = Math.pow(1 + tipm, nper);
        pmt = - tipm * (pv * pvif + fv) / (pvif - 1);

        if (type === 1)
            pmt /= (1 + tipm);
        return pmt;
    }

    // let rate = (4 / 100) / 12; // 4% rate 
    // let nper = 30 * 12; //30 years in months
    // let pv = -400000 * (1 - (3.5 / 100)); //3.5%

    // call the function
    // console.log('Renta mensual',PMT(0.0242, 12,-823141.90, 5000, 0))
    let rentaMensual = PMT(0.0250, plazo, -montoArrendamientoFinalSinIva.toFixed(2), valorResidualSinIva , 0)
    resultados.rentaMensual = rentaMensual
    console.log('Renta mensual', rentaMensual)

    return resultados
}
