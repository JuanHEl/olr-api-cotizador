
export interface IDTOAdministrador {
    id?: number,
    nombre: string,
    email: string,
    password: string,
    tipo_administrador: string
}

export interface IDTOUpdatePassword {
    password: string,
    newPassword: string
}

export interface IDTOReplacePassword {
    id_editPassword: number,
    newPassword: string
}
