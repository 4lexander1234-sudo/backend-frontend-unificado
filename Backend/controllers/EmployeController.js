const employeService = require("../services/EmployeService");

// maneja las solictudes relacionadas con empleados en employeService
class EmployeController {
  async list(req, res, next) {
    try {
      const employe = await employeService.list();
      res.json(employe);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const employe = await employeService.getById(req.params.id);
      res.json(employe);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const employe = await employeService.create(req.body);
      res.status(201).json({id_empleado:employe.id_empleado});
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
      const employe = await employeService.update(req.params.id, req.body);
      res.json(employe);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await employeService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EmployeController();