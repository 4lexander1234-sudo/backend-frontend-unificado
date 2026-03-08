// services/Proveedorervice.js
const proveedorRepository = require("../repositories/ProveedorRepository");

class ProveedorService {
  async list() {
    return await proveedorRepository.findAll();
  }

  async getById(id) {
    const proveedor = await proveedorRepository.findById(id);
    if (!proveedor) throw new Error("Proveedor no encontrado");
    return proveedor;
  }

  async create(payload) {
    if (!payload) {
      throw new Error("datos son requeridos");
    }
    /*if(!payload.email){
      throw new Error("El email es obligatorio");
    }
    // Validar duplicados por email
    const existing = await clientRepository.findAll();
    if (existing.some(c => c.email === payload.email)) {
      console.error("Error en ClientService:");
      throw new Error("Email ya registrado");
    }*/

    return await proveedorRepository.create(payload);
  }

  async update(id, payload) {
    const proveedor = await proveedorRepository.findById(id);
    if (!proveedor) throw new Error("Proveedor no existe");

    return await proveedorRepository.update(id, payload);
  }

  async delete(id) {
    const proveedor = await proveedorRepository.findById(id);
    if (!proveedor) throw new Error("Proveedor no existe");

    return await proveedorRepository.delete(id);
  }
}

module.exports = new ProveedorService();