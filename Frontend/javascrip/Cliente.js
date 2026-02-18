class Cliente {
  constructor({ nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion }) {
    this.nombre = nombre.trim();
    this.apellido = apellido.trim();
    this.tipo_documento = tipo_documento.trim();
    this.numero_documento = numero_documento;
    this.email = email.trim();
    this.telefono = telefono.trim();
    this.direccion = direccion.trim();
    this.fecha_registro = new Date().toISOString()
  }
}