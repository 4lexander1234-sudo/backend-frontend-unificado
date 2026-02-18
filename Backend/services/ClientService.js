// services/ClientService.js
const clientRepository = require("../repositories/ClientRepository");

class ClientService {
  async list() {
    return await clientRepository.findAll();
  }

  async getById(id) {
    const client = await clientRepository.findById(id);
    if (!client) throw new Error("Cliente no encontrado");
    return client;
  }

  async create(payload) {
    if (!payload) {
      throw new Error("datos son requeridos");
    }
    if(!payload.email){
      throw new Error("El email es obligatorio");
    }
    // Validar duplicados por email
    const existing = await clientRepository.findAll();
    if (existing.some(c => c.email === payload.email)) {
      console.error("Error en ClientService:");
      throw new Error("Email ya registrado");
    }

    return await clientRepository.create(payload);
  }

  async update(id, payload) {
    const client = await clientRepository.findById(id);
    if (!client) throw new Error("Cliente no existe");

    return await clientRepository.update(id, payload);
  }

  async delete(id) {
    const client = await clientRepository.findById(id);
    if (!client) throw new Error("Cliente no existe");

    return await clientRepository.delete(id);
  }
}

module.exports = new ClientService();