// Se declaran los tipos de datos que se van a recibir

export interface IDTOCotizacion {
    cliente: string,
    enAtenciónA: string,
    tipoCliente: string,
    promotor: string,
    correo: string
    telefono: string,
    tipoActivo: string,
    cantidadUnidades: number,
    marca: string,
    modelo: string,
    version: string,
    estado: string,
    precioActivo: number,
    plazo: number,
    comisionApertura: number,
    anticipoArrendamiento: number,
    plan: string,
    tipoSeguro: string,
    costoSeguro: number
    rentasDeposito: number,
    tipoResidual: string,
    fondoReserva: number,
    valorResidualConvenido: number,
    accesorio: IDTOAccesorios
}

export interface IDTOAccesorios {
    nombreAccesorio: string,
    descripcionAccesorio: string,
    valorAccesorio: number
}
