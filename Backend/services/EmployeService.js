// services/EmployeService.js
const employeRepository = require("../repositories/EmployeRepository");

class EmployeService {
  async list() {
    return await employeRepository.findAll();
  }

  async getById(id) {
    const employe = await employeRepository.findById(id);
    if (!employe) throw new Error("Empleado no encontrado");
    return employe;
  }

  async create(payload) {
    if (!payload) {
      throw new Error("datos son requeridos");
    }
    if(!payload.email){
      throw new Error("El email es obligatorio");
    }
    // Validar duplicados por email
    const existing = await employeRepository.findAll();
    if (existing.some(c => c.email === payload.email)) {
      console.error("Error en employeService:");
      throw new Error("Email ya registrado");
    }

    return await employeRepository.create(payload);
  }

  async update(id, payload) {
    const employe = await employeRepository.findById(id);
    if (!employe) throw new Error("Empleado no existe");

    return await employeRepository.update(id, payload);
  }

  async delete(id) {
    const employe = await employeRepository.findById(id);
    if (!employe) throw new Error("Empleado no existe");

    return await employeRepository.delete(id);
  }
}

module.exports = new EmployeService();