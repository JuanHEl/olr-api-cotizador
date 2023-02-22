
export interface IDTOValorTasas {
    plazo: number,
    tipo_activo: string,
    tasa_a: number,
    tasa_b: number,
    tasa_alfa: number,
    tasa_beta: number,
    tasa_gamma: number
}

export interface IDTOGetTasasByTipoActivo {
    tipo_activo: string,
    page: number,
    limit: number,
}

export interface IDTOValorTasasUpdate {
    id: number,
    tasa_a: number,
    tasa_b: number,
    tasa_alfa: number,
    tasa_beta: number,
    tasa_gamma: number
}
