// services/ProductService.js
const productRepository = require("../repositories/ProductRepository");

class ProductService {
  async list() {
    return await productRepository.findAll();
  }

  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
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

    return await productRepository.create(payload);
  }

  async update(id, payload) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Producto no existe");

    return await productRepository.update(id, payload);
  }

  async delete(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Producto no existe");

    return await productRepository.delete(id);
  }
}

module.exports = new ProductService();