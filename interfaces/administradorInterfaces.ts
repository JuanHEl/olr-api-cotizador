
export interface IDTOAdministrador {
    nombre: string,
    email: string,
    password: string,
    tipo_administrador: string
}

export interface IDTOUpdatePassword {
    password: string,
    newPassword: string
  }