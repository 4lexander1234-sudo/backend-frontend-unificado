const clientService = require("../services/ClientService");

// maneja las solictudes relacionadas con clientes en ClientService
class ClientController {
  async list(req, res, next) {
    try {
      const clients = await clientService.list();
      res.json(clients);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const client = await clientService.getById(req.params.id);
      res.json(client);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const client = await clientService.create(req.body);
      res.status(201).json(client);
    } catch (err) {
  // Manejo de errores conocidos
    console.error(err.message);

    if (err.message === "Email ya registrado") {
      return res.status(409).json({ error: err.message }); 
    }
    if (err.message === "Datos son requeridos") {
      return res.status(400).json({ error: err.message });    }

    // Si viene un error de Supabase con código
    if (err.code === "23505") {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }
    next(err)
    }
  }

  async update(req, res, next) {
    try {
      const client = await clientService.update(req.params.id, req.body);
      res.json(client);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await clientService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ClientController();